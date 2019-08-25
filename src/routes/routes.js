import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';

const routes = [
    {
        path: '/',
        exact: true,
        private: true,
        main: HomePage
    },
    {
        path: '/login',
        exact: true,
        private: false,
        main: LoginPage
    }
];

export default routes;