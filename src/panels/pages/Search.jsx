import React from 'react';
import {Panel, PanelHeader} from "@vkontakte/vkui";
import PropTypes from "prop-types";
import Element from "./Element";

const Search = ({ id }) => (
  <Panel id={id}>
    <PanelHeader>Язык жестов</PanelHeader>
  </Panel>
);

Search.propTypes = {
  id: PropTypes.string.isRequired
};

export default Search;