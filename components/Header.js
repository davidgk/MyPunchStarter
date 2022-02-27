import {Icon, Menu, MenuItem} from "semantic-ui-react";
import { Link } from "../routes"

export default () => {
    return (
        <Menu style={{ marginTop: '10px'}}>
            <MenuItem>
                <Link route="/">
                    My Punch Starter
                </Link>
            </MenuItem>
            <Menu.Menu position="right">
                <MenuItem>
                    <Link route="/">
                        Campaigns
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link route="/campaigns/new">
                        <Icon name="add circle" size="small"/>
                    </Link>
                </MenuItem>
            </Menu.Menu>
        </Menu>
    );
}