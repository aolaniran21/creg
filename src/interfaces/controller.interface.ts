import { Router } from "express";

interface IController {
  path?: string;
  router?: Router;
  middleware?: Function;
}

export default IController;
