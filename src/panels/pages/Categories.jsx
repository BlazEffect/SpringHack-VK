import React from 'react';
import {Panel, PanelHeader} from "@vkontakte/vkui";

const Categories = ({ id }) => (
  <Panel id={id}>
    <PanelHeader>Язык жестов</PanelHeader>
  </Panel>
);

export default Categories;