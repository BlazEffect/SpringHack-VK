import React from 'react';
import {Panel, PanelHeader} from "@vkontakte/vkui";
import PropTypes from "prop-types";
import Home from "./Home";

const Achievements = ({ id }) => (
  <Panel id={id}>
    <PanelHeader>Язык жестов</PanelHeader>
  </Panel>
);

Achievements.propTypes = {
  id: PropTypes.string.isRequired
};

export default Achievements;