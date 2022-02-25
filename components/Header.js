import {Icon, Menu, MenuItem} from "semantic-ui-react";


export default () => {
    return (
        <Menu style={{ marginTop: '10px'}}>
            <MenuItem>
                My Punch Starter
            </MenuItem>
            <Menu.Menu position="right">
                <MenuItem>
                    Campaigns
                </MenuItem>
                <MenuItem>
                    <Icon name="add circle" size="small"/>
                </MenuItem>
            </Menu.Menu>
        </Menu>
    );
}