import Card from "../components/shared/Card"
import { Link } from "react-router-dom"

function About() {
    return (
        <Card>
            <div className='about'>
                <h2>About</h2>
                <p>This is a react feedback app. </p>

                <p>
                    <Link to="/">Back To Home</Link>
                </p>
            </div>
        </Card>
    )
}

export default About
