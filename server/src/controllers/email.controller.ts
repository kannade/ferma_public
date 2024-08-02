import { Request, Response, NextFunction } from "express";
import nodemailer, { TestAccount } from "nodemailer";
import _ from "lodash";

export interface MailInterface {
  from?: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  text?: string;
  html: string;
}

export default class MailService {
  private static instance: MailService;
  private static account: TestAccount;
  private transporter: nodemailer.Transporter | undefined;
  private constructor() {}

  static getInstance() {
    try {
      if (!MailService.instance) {
        MailService.instance = new MailService();
      }
    } catch (error) {
      console.error("Failed to getInstance:", error);
    }
    return MailService.instance;
  }

  //CREATE CONNECTION FOR LOCAL
  async createLocalConnection() {
    MailService.account = await nodemailer.createTestAccount();
    this.transporter = nodemailer.createTransport({
      host: MailService.account.smtp.host,
      port: MailService.account.smtp.port,
      secure: MailService.account.smtp.secure,
      auth: {
        user: MailService.account.user,
        pass: MailService.account.pass,
      },
    });
  }

  //CREATE CONNECTION FOR LIVE
  async createConnection() {
    try {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_TLS === "yes" ? true : false,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      });
    } catch (error) {
      console.error("Failed to create transport:", error);
    }
  }

  async sendMailMethod(options: MailInterface) {
    return (
      this.transporter &&
      (await this.transporter
        .sendMail({
          from: `LuckBerry <${
            _.isObject(MailService.account) &&
            _.isString(MailService.account.user) &&
            MailService.account.user
              ? MailService.account.user
              : process.env.SMTP_USERNAME
          }>`,
          // from: process.env.SMTP_SENDER,
          to: options.to,
          cc: options.cc,
          bcc: options.bcc,
          subject: options.subject,
          text: options.text,
          html: options.html,
        })
        .then((info) => {
          return info;
        }))
    );
  }

  async sendEmail(req: Request, res: Response, next: NextFunction) {
    try {
      // console.log(req.body);
      let { email, message, subject, name } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required." });
      }

      message += `<br /><br />Отправитель <b>${name}</b>: ${email}`;

      const options: MailInterface = {
        to: process.env.SMTP_USERNAME as string, // email, // Assuming 'email' is the recipient's email address
        subject: subject,
        html: message,
      };

      try {
        await MailService.getInstance()
          .sendMailMethod(options)
          .then((info) => {
            res.status(200).json({
              message: "Ваше письмо успешно отправлено!",
            });
          });
      } catch (error) {
        res.status(500).json({ message: error });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  //VERIFY CONNECTION
  async verifyConnection() {
    return this.transporter && this.transporter.verify();
  }
  //CREATE TRANSPOTER
  getTransporter() {
    return this.transporter;
  }
}
