import { pushData } from '../controllers/kafkaController'
import { pullData } from '../controllers/kafkaCounsumer'

const kafkaRoutes = (app) => {

    app.route('/push')
        .post(pushData);

    app.route('/pull')
        .post(pullData);

    app.route('/message/:messageId')
        .put((req, res) =>
            res.send('PUT request successfull !'))

        .delete((req, res) =>
            res.send('DELETE request successfull !'));
};


export default kafkaRoutes;
