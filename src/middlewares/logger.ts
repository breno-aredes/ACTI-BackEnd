import { Request, Response, NextFunction } from "express";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip || req.connection.remoteAddress;

  console.log(`📝 [${timestamp}] ${method} ${url} - IP: ${ip}`);

  if (["POST", "PUT", "PATCH"].includes(method)) {
    const body = { ...req.body };

    if (body.password) body.password = "***";
    if (body.token) body.token = "***";

    console.log(`📄 Body:`, JSON.stringify(body, null, 2));
  }

  next();
};

export const responseLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalSend = res.send;

  res.send = function (data) {
    const timestamp = new Date().toISOString();
    console.log(
      `📤 [${timestamp}] Response ${res.statusCode} - ${req.method} ${req.originalUrl}`
    );
    return originalSend.call(this, data);
  };

  next();
};
