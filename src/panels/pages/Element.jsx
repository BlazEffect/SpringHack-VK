import React from 'react';
import {Panel, PanelHeader} from "@vkontakte/vkui";
import PropTypes from "prop-types";
import Category from "./Category";

const Element = ({ id }) => (
  <Panel id={id}>
    <PanelHeader>Язык жестов</PanelHeader>
  </Panel>
);

Element.propTypes = {
  id: PropTypes.string.isRequired
};

export default Element;