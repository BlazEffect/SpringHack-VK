import React from 'react';
import {Panel, PanelHeader} from "@vkontakte/vkui";
import PropTypes from "prop-types";
import Search from "./Search";

const Settings = ({ id }) => (
  <Panel id={id}>
    <PanelHeader>Язык жестов</PanelHeader>
  </Panel>
);

Settings.propTypes = {
  id: PropTypes.string.isRequired
};

export default Settings;