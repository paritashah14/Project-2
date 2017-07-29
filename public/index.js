(async () => {
  const {
    uid,
    promise
  } = $;
  const socket = io({
    transports: ['websocket']
  });
  const events = {};
  socket.on('connect', () => {
    console.log('Connected');
  });
  socket.on('api', (json) => {
    const id = json.id;
    uid.free(id);
    events[id](json);
  });
  $.socket = socket;
  $.send = (data) => {
    return promise((accept) => {
      const id = uid();
      events[id] = accept;
      data.id = id;
      socket.emit('api', data);
    });
  };
  const send = $.send;
  const app = new Ractive({
    el: '#main',
    template: '#tpl',
    data: {
      response: '',
      ask: '',
      errors: '',
      settingsMode: false,
      loginMode: false,
      registerMode: true,
      loginStatus: false,
      voiceChat: false,
      user: {
        email: '',
        password: ''
      },
      token: {},
      bot: '',
      login: {
        email: 'e@e.com',
        password: 'e'
      },
      register: {
        email: 'e@e.com',
        password: 'e',
        confirm: 'e'
      }
    }
  });
  app.on('login', async () => {
    const body = app.get('login');
    console.log(body);
    const json = await send({
      body,
      name: 'login',
    });
    console.log(json);
    if (json.error) {
      return app.set('errors', json.error);
    }
    localStorage.token = JSON.stringify(json.token);
    localStorage.user = JSON.stringify(json.user);
    app.set('user', json.user);
    app.set('token', json.token);
    app.set('loginStatus', true);
    app.set('errors', '');
  });
  app.on('register', async () => {
    const body = app.get('register');
    console.log(body);
    if (body.confirm !== body.password) {
      return app.set('errors', 'Passwords did not match');
    }
    const json = await send({
      body,
      name: 'register',
    });
    console.log(json);
    if (json.error) {
      return app.set('errors', json.error);
    }
    localStorage.token = JSON.stringify(json.token);
    localStorage.user = JSON.stringify(json.user);
    app.set('user', json.user);
    app.set('token', json.token);
    app.set('loginStatus', true);
    app.set('errors', '');
  });
  app.on('sendBot', async () => {
    const body = app.get('ask');
    console.log(body);
    const json = await send({
      body,
      name: 'bot',
    });
    app.set('response', json.result);
  });
  app.on('loginPanel', async () => {
    console.log('Login Panel');
    await app.set('loginMode', true);
    await app.set('registerMode', false);
  });
  app.on('codi', async () => {
    await app.set('voiceChat', true);
  });
  app.on('registerPanel', async () => {
    console.log('Register Panel');
    await app.set('loginMode', false);
    await app.set('registerMode', true);
    app.update();
  });
  app.on('logout', async () => {
    await send({
      name: 'logout'
    });
    app.set('loginStatus', false);
    app.set('settingsMode', false);
    app.set('user', {});
    app.set('token', {});
    localStorage.clear();
  });
  app.on('settings', async () => {
    app.toggle('settingsMode');
  });
  app.on('updateSettings', async () => {
    const body = app.get('user');
    const results = await send({
      body,
      name: 'update'
    });
    app.set('user', results.user);
    alert('Profile Updated');
  });
  app.on('rip', async () => {
    await send({
      name: 'rip'
    });
    app.set('loginStatus', false);
    app.set('settingsMode', false);
    app.set('user', {});
    app.set('token', {});
    localStorage.clear();
  });
  const validate = async () => {
    const token = JSON.parse(localStorage.token);
    const user = JSON.parse(localStorage.user);
    if (token) {
      const result = await send({
        body: {
          token,
          user
        },
        name: 'validate'
      });
      if (result.error) {
        localStorage.clear();
      } else {
        app.set('user', user);
        app.set('token', token);
        app.set('loginStatus', true);
      }
    }
  };
  validate();
  $.app = app;
})();
