const db = require(`./models`);
const lucy = require('Lucy');
const cryptoLib = require('crypto');
const apiai = require('apiai');
const aiapp = apiai("aa7a66c8d2734135b817745ffa71115c");
const {
  promise,
  pick
} = lucy;
const generateToken = () => {
  return promise((accept) => {
    cryptoLib.randomBytes(48, (err, buffer) => {
      if (err) {
        return;
      }
      accept(buffer.toString('hex'));
    });
  });
};
const createToken = async (socket, response) => {
  console.log(socket.user, 'socket.user create Token');
  await db.Token.destroy({
    where: {
      userId: socket.user.id,
    }
  });
  const token = await db.Token.create({
    userId: socket.user.id,
    token: await generateToken()
  });
  socket.token = token;
  response.token = token;
};
const api = {
  async logout(socket, body, response) {
    await db.Token.destroy({
      where: {
        userId: socket.user.email,
      }
    });
    response.success = true;
  },
  async rip(socket) {
    if (!socket.user) {
      return;
    }
    await db.Token.destroy({
      where: {
        userId: socket.user.id,
      }
    });
    await db.Registration.destroy({
      where: {
        id: socket.user.id,
      }
    });
  },
  async update(socket, body, response) {
    if (!socket.user) {
      return;
    }
    await db.Registration.update(pick(body, ['email', 'password']), {
      where: {
        id: body.id,
      }
    });
    const user = await db.Registration.findOne({
      where: {
        id: body.id,
      }
    });
    const cleaned = pick(user, ['email', 'createdAt', 'id']);
    socket.user = cleaned;
    response.user = cleaned;
  },
  async validate(socket, body, response) {
    const token = await db.Token.findOne({
      where: body.token,
    });
    if (token) {
      const user = await db.Registration.findOne({
        where: {
          email: body.user.email
        }
      });
      socket.token = token;
      response.token = token;
      const cleaned = pick(user, ['email', 'createdAt', 'id']);
      socket.user = cleaned;
      response.user = cleaned;
    } else {
      response.error = 'Not Valid';
    }
  },
  async register(socket, body, response) {
    if (body.password === body.confirm) {
      const userCheck = await db.Registration.findOne({
        where: {
          email: body.email
        }
      });
      if (userCheck) {
        response.error = 'User already exists';
        return;
      }
      const user = await db.Registration.create({
        email: body.email,
        password: body.password,
      });
      const cleaned = pick(user, ['email', 'createdAt', 'id']);
      socket.user = cleaned;
      response.user = cleaned;
      console.log(user.id, 'userid register');
      await createToken(socket, response);
    } else {
      response.error = 'Passwords did not match';
    }
  },
  async login(socket, body, response) {
    const user = await db.Registration.findOne({
      where: {
        email: body.email,
        password: body.password
      }
    });
    if (user) {
      const cleaned = pick(user, ['email', 'createdAt', 'id']);
      socket.user = cleaned;
      response.user = cleaned;
      await createToken(socket, response);
    } else {
      response.error = 'Login failed';
    }
  },
  async bot(socket, body, response) {
    if (!socket.user) {
      return;
    }
    const request = aiapp.textRequest(body, {
        sessionId: socket.id
    });
    const result = await promise((accept) => {
      request.on('response', (responseBot) => {
        console.log(responseBot.result.fulfillment.speech);
        console.log(responseBot.result.parameters);
        accept(responseBot.result.fulfillment.speech);
      });
      request.on('error', (error) => {
        accept(error);
      });
      request.end();
    });
    response.result = result;
  }
};
module.exports = api;
