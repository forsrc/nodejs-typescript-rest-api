import * as express from 'express'
import BaseController from './BaseController';
import BaseService from '../service/BaseService';



abstract class BaseControllerImpl<MODEL> implements BaseController<MODEL>{


    private baseService: BaseService<MODEL>;

    constructor(baseService: BaseService<MODEL>) {
        this.list = this.list.bind(this);
        this.save = this.save.bind(this);
        this.get = this.get.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.baseService = baseService;
    }


    list(req: express.Request, res: express.Response): void {
        this.baseService.list().then((rows) => {
            res.status(200).json({ status: "ok", rows: rows });
        }).catch((err) => {
            res.status(400).json({ status: "ng", error: err });
        });

    }


    save(req: express.Request, res: express.Response): void {
        if (!req.body) {
            res.status(400).json({ status: "ng", error: "req.body is empty" });
            return;
        }
        let model: MODEL = {} as MODEL;
        Object.assign(model, req.body);

        this.baseService.save(model).then((info) => {

            res.status(200).json({ status: "ok", message: info });
        }).catch((err) => {
            res.status(400).json({ status: "ng", error: err });
        });

    }


    get(req: express.Request, res: express.Response) {

        let model: MODEL = {} as MODEL;
        Object.assign(model, req.params);

        this.baseService.get(model).then((one) => {
            if (one) {
                res.status(200).json({ status: "ok", user: one });
            } else {
                res.status(404).json({ status: "ng", error: `no such model '${JSON.stringify(model)}'` });
            }


        }).catch((err) => {
            res.status(400).json({ status: "ng", "error": err });
        });

    }


    update(req: express.Request, res: express.Response) {
        if (!req.body) {
            res.status(400).json({ status: "ng", error: "req.body is empty" });
            return;
        }

        let model: MODEL = {} as MODEL;
        Object.assign(model, req.body);

        this.baseService.update(model).then((info) => {
            if (status) {
                res.status(200).json({ status: "ok", message: info });
            } else {
                res.status(404).json({ status: "ng", error: `no such user '${JSON.stringify(model)}'` });
            }

        }).catch((err) => {
            res.status(400).json({ status: "ng", "error": err });
        });
    }


    delete(req: express.Request, res: express.Response) {

        console.log("delete --->", req.params);
        let model: MODEL = {} as MODEL;
        Object.assign(model, req.params);

        this.baseService.delete(model).then((status) => {
            res.status(200).json({ status: "ok", message: `'${JSON.stringify(model)}' is deleted.` });
        }).catch((err) => {
            res.status(400).json({ status: "ng", "error": err });
        });
    }
}

//export default new UserController();
export default BaseControllerImpl;