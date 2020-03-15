const router = require('express').Router();
const fs = require('fs');

const dataPath = './src/data/channel.json';

const getUpcomingCourses = (_req, res, _next) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        const result = JSON.parse(data);
        res.send({ message: 'Success', data: result });
    });
};

//GET current route (required, only authenticated users have access)
router.get('/upcoming', getUpcomingCourses);

module.exports = router;
