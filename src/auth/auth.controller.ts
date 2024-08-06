import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Query,
	Req,
	Res,
	UnauthorizedException,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserDto } from '../user/dto/user.dto'
import { Request, Response } from 'express'
import { AuthDto } from './dto/auth.dto'
import { GoogleGuard } from './guards/google.guard'
import {
	ApiExcludeEndpoint,
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { AuthResponse, LogoutResponse } from '../docs/auth-response'

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'User registration' })
	@ApiResponse({
		status: 200,
		type: AuthResponse,
		description: 'Successful register and user details returned'
	})
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('register')
	async register(
		@Body() userDto: UserDto,
		@Res({ passthrough: true }) res: Response
	) {
		const { refreshToken, ...response } =
			await this.authService.register(userDto)
		this.authService.addRefreshTokenToResponse(res, refreshToken)

		return response
	}

	@ApiOperation({ summary: 'User login' })
	@ApiResponse({
		status: 200,
		type: AuthResponse,
		description: 'Successful login and user details returned'
	})
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(
		@Body() authDto: AuthDto,
		@Res({ passthrough: true }) res: Response
	) {
		const { refreshToken, ...response } = await this.authService.login(authDto)
		this.authService.addRefreshTokenToResponse(res, refreshToken)

		return response
	}

	@ApiOperation({ summary: 'User logout' })
	@ApiResponse({
		status: 200,
		type: LogoutResponse,
		description: 'Successful register and user details returned'
	})
	@HttpCode(200)
	@Post('logout')
	logout(@Res({ passthrough: true }) res: Response) {
		this.authService.removeRefreshTokenFromResponse(res)

		return { message: 'You are logout from the system successfully!' }
	}

	@ApiOperation({ summary: 'Get new tokens for user' })
	@ApiResponse({
		status: 200,
		type: AuthResponse,
		description: 'Successful register and user details returned'
	})
	@ApiResponse({
		status: 401,
		description: 'Refresh token not passed!'
	})
	@HttpCode(200)
	@Post('login/access-token')
	async getNewTokens(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		const refreshTokenFromCookies = req.cookies[process.env.REFRESH_TOKEN_NAME]
		if (typeof refreshTokenFromCookies !== 'string') {
			this.authService.removeRefreshTokenFromResponse(res)
			throw new UnauthorizedException('Refresh token not passed!')
		}

		const { refreshToken, ...response } = await this.authService.getNewTokens(
			refreshTokenFromCookies
		)

		this.authService.addRefreshTokenToResponse(res, refreshToken)

		return response
	}

	@ApiExcludeEndpoint()
	@Get('verify-email')
	async verifyEmail(@Query('token') token: string) {
		return this.authService.verifyEmail(token)
	}

	@ApiExcludeEndpoint()
	@Get('google/login')
	@UseGuards(GoogleGuard)
	async oAuthGoogle() {}

	@ApiOperation({ summary: 'Auth through Google oAuth' })
	@ApiResponse({
		status: 200,
		type: AuthResponse,
		description: 'Successful register or login and user details returned'
	})
	@Get('google/callback')
	@UseGuards(GoogleGuard)
	async oAuthGoogleCallback(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		const user = req.user as UserDto
		const { refreshToken, ...response } = await this.authService.login(user)
		this.authService.addRefreshTokenToResponse(res, refreshToken)

		return response
	}
}
