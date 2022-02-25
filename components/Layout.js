import Header from "./Header";
import {Container} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
const Layout = (props) => {
    return (
        <div>
            <Container>
                <Header/>
                <div style={{marginTop: "30px"}}>
                    {props.children}
                </div>
            </Container>

        </div>
    );
}

export default Layout;