import React from 'react';

class Signin extends React.Component {
    constructor(props){
        super(props);
        this.state={
            signinEmail: '',
            signinPassword: ''
        }
    }
    onEmailChange = (event)=>{
        this.setState({signinEmail: event.target.value});
    }
    
    onPasswordChange = (event)=>{
        this.setState({signinPassword: event.target.value});
    }

    onSubmitButton = () =>{
        let bodyContent = JSON.stringify({
            email: this.state.signinEmail,
            password: this.state.signinPassword
        });
        console.log("1   " + bodyContent);

        fetch('http://localhost:3001/signin', 
           { method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: bodyContent
            }
        )
        .then(response => response.json())
        .then(user =>{
            if(user.id){
                console.log("2   " + bodyContent);
                this.props.loadUser(user);
                this.props.onRouteChange('home');
                console.log("3   " + bodyContent);
            }
            else{
                alert("failed to signin");
            }
            
        })    
    }


    render(){
        return(
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shados-5">
                <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    onChange = {this.onEmailChange}
                    type="email" 
                    name="email-address"  
                    id="email-address"/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                     onChange = {this.onPasswordChange}
                    type="password" 
                    name="password"  
                    id="password"/>
                </div>
                </fieldset>
                <div >
                <input 
                onClick = {this.onSubmitButton}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit"
                 value="Sign in"/>
                </div>
                <div className="lh-copy mt3">
                <p onClick = {() => this.props.onRouteChange("register")} className="f6 link dim black db pointer">Register</p>
                </div>
            </div>
    </main>
    
            </article>
        );
}
    
}
export default Signin;