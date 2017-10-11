import * as passport from 'passport';

function serializeUser( $user: any, $done: ( $err: any, $user_id: string ) => void ): void{
	$done( null, $user.user_id );
}

function deserializeUser( $user_id: string, $done: ( $err: any, $user: any ) => void ): void{
	$done( null, { user_id: $user_id } );
}

passport.serializeUser( serializeUser );
passport.deserializeUser( deserializeUser );

import * as Express from 'express';
import * as ExpressSession from 'express-session';

const app = Express();
app.use( ExpressSession( { secret: "test" } ) );
app.use( passport.initialize() );
app.use( passport.session() );
app.get( "/", ( $req: Express.Request, $res: Express.Response ): void =>{
	$res.json( { user: $req.user } );
})
app.get( "/login/:user_id", ( $req: Express.Request, $res: Express.Response ): void => {
	$req.login( { user_id: $req.params.user_id }, ( $err: any ): void =>{
		$res.json( { result: "login success", user: $req.user } );
	} )
})
app.get( "/logout", ( $req: Express.Request, $res: Express.Response ): void => {
	$req.logout();

	$res.json( { result: "logout success", user: $req.user } );
})

app.listen( 80, (): void =>{
	console.log( 'Listen~' );
} );