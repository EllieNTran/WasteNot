import { Request } from 'express'
import { ControllerResult } from '../withExpress'

const controller = async (req: Request): Promise<ControllerResult> => {
  return {
    status: 400,
  }
}

export default controller
