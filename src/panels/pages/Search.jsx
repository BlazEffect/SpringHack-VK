import React, { useState, useEffect } from "react";
import {FormLayout, IconButton, Input} from "@vkontakte/vkui";
import {Icon16Clear} from "@vkontakte/icons";

function SearchObjectsByField({ data }) {
  const [filteredObjects, setFilteredObjects] = useState([]);

  const textInput = React.createRef();
  const clear = () => (textInput.current.value = '');

  useEffect(() => {
    setFilteredObjects(data);
  }, [data]);

  function filterObjects(field, value) {
    const filtered = data.filter(obj => {
      if (obj.hasOwnProperty(field)) {
        return obj[field] === value;
      }
      return false;
    });
    setFilteredObjects(filtered);
  }

  return (
    <div>

      <FormLayout>
          <Input
            getRef={textInput}
            type="text"
            placeholder="Название жеста"
            after={
              <IconButton hoverMode="opacity" aria-label="Очистить поле" onClick={clear}>
                <Icon16Clear />
              </IconButton>
            }
            onChange={e => filterObjects("name", e.target.value)}
          />
      </FormLayout>

      <ul>
        {filteredObjects.map(obj => (
          <li key={obj.id}>{obj.name}</li>
        ))}
      </ul>
    </div>
  );
}

function Search() {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    fetch("data.json")
      .then(response => response.json())
      .then(data => setJsonData(data));
  }, []);

  return <SearchObjectsByField data={jsonData} />;
}

export default Search;
