import React from 'react';
import {Panel, PanelHeader} from "@vkontakte/vkui";
import PropTypes from "prop-types";
import Achievements from "./Achievements";

const Categories = ({ id }) => (
  <Panel id={id}>
    <PanelHeader>Язык жестов</PanelHeader>
  </Panel>
);

Categories.propTypes = {
  id: PropTypes.string.isRequired
};

export default Categories;