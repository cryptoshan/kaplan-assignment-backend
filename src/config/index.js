require('dotenv').config();

['NODE_ENV', 'PORT'].forEach(name => {
    if (!process.env[name]) {
        throw new Error(`Environment variable ${name} is missing`);
    }
});

const config = () => {
    const env = process.env.NODE_ENV;
    //server
    const port = Number(process.env.PORT);

    return {
        env,
        server: {
            port
        }
    };
};

module.exports = Object.assign({}, config());
