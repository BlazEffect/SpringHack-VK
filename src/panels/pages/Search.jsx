import React, { useState, useEffect } from "react";
import {
  FormLayout,
  IconButton,
  Input,
  Text,
  Group,
  View,
  ContentCard,
  CardGrid,
  Panel,
} from "@vkontakte/vkui";
import { Icon16Clear } from "@vkontakte/icons";
import data from "../../data.json";
import DetailCard from "./DetailCard";
import ButtonBack from "../components/ButtonBack";

function SearchObjectsByField({ data }) {
  const [filteredObjects, setFilteredObjects] = useState([]);
  const [activePanel, setActivePanel] = useState('default_search')

  const textInput = React.createRef();
  const clear = () => (textInput.current.value = "");

  useEffect(() => {
    setFilteredObjects(data);
  }, [data]);

  function filterObjects(field, value) {
    const filtered = data.filter((obj) => {
      console.log(field, value);
      if (obj.hasOwnProperty(field)) {
        return obj[field].toLowerCase().includes(value.toLowerCase());
      }
      return false;
    });
    setFilteredObjects(filtered);
  }

  const returnBack = () => {
    setFilteredObjects(data);
    setActivePanel('default_search');
  }

  return (
    <div className="px-3">
      <View activePanel={activePanel}>
        <Panel id="default_search">
          <FormLayout className="mt-3">
            <Input
              getRef={textInput}
              type="text"
              placeholder="Название жеста"
              after={
                <IconButton
                  hoverMode="opacity"
                  aria-label="Очистить поле"
                  onClick={clear}
                >
                  <Icon16Clear />
                </IconButton>
              }
              onChange={(e) => filterObjects("name", e.target.value)}
            />
          </FormLayout>
          <CardGrid size="l" className="mt-3">
            {filteredObjects.map((obj) => (
              <ContentCard onClick={() => setActivePanel(obj.id)} className="shadow" key={obj.id} header={obj.name} />
            ))}
          </CardGrid>
        </Panel>
        {filteredObjects.map((lesson) => (
          <Panel id={lesson.id} key={lesson.id}>
            <DetailCard lesson={lesson} />
            <ButtonBack returnBack={() => returnBack()} />
          </Panel>
        ))}
      </View>
    </div>
  );
}

function Search() {
  const itemsData = data.map((cat) => cat?.items).filter((ar) => ar.length);
  return (
    <>
      <SearchObjectsByField data={itemsData[0]} />
    </>
  );
}

export default Search;
