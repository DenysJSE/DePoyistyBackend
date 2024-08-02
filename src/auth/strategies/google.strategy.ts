import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-google-oauth2'
import { AuthService } from '../auth.service'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(private readonly authService: AuthService) {
		super({
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL,
			scope: ['profile', 'email']
		})
	}

	async validate(
		_accessToken: string,
		_refreshToken: string,
		profile: any
	): Promise<any> {
		const { name, emails } = profile

		const user = {
			isGoogleAuth: true,
			isEmailVerified: true,
			email: emails[0].value,
			password: null,
			name: `${name.givenName} ${name.familyName}`,
			// city: null,
			verificationToken: null
		}

		return this.authService.oAuthGoogle(user)
	}
}
