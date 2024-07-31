import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'

@Injectable()
export class MailService {
	private transporter

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 587,
			secure: false,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD
			}
		})
	}

	async sendVerificationEmail(to: string, token: string) {
		const url = `http://localhost:${process.env.PORT}/verify-email?token=${token}`

		await this.transporter.sendMail({
			from: '"De Poyisty"',
			to,
			subject: 'Email Verification',
			text: `Click the link to verify your email: ${url}`,
			html: `<a href="${url}">Click here to verify your email</a>`
		})
	}

	async sendConfirmationEmail(to: string) {
		await this.transporter.sendMail({
			from: '"Coffee Store" <your-email@example.com>',
			to,
			subject: 'Email Verified Successfully',
			text: 'Your email has been successfully verified.',
			html: '<p>Your email has been successfully verified.</p>'
		})
	}
}
