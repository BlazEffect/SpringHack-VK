import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader} from "@vkontakte/vkui";

const Home = ({ id }) => (
    <Panel id={id}>
        <PanelHeader>Язык жестов</PanelHeader>

        {/*<img src="/src/img/main_picture.png" alt=""/>*/}
    </Panel>
);

Home.propTypes = {
  id: PropTypes.string.isRequired
};

export default Home;