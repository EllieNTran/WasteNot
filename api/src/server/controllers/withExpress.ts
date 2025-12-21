import { Request, Response } from 'express';

export interface ControllerResult {
  headers?: Record<string, string>;
  status?: number;
  body?: any;
  stream?: NodeJS.ReadableStream;
}

const withExpress = (controller: (req: Request) => Promise<ControllerResult | null>) => async (req: Request, res: Response) => {
  const result = await controller(req)

  if (result === null || typeof result !== 'object') {
    res.end()
    return
  }

  if (result.headers !== null && typeof result.headers === 'object') {
    if (Object.keys(result.headers).length > 0) {
      res.set(result.headers)
    }
  }

  if (result.status !== undefined) {
    res.status(result.status)
  }

  if (result.body !== undefined) {
    res.send(result.body)
  } else if (result.stream !== undefined) {
    result.stream.pipe(res)
  } else {
    res.end()
  }
}

export default withExpress
