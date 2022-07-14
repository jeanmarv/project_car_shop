import App from './app';
import routes from './routes';

const server = new App();
server.addRouter(routes);
export default server;