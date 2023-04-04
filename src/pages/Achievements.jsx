import React, { useState } from "react";
import PropTypes from "prop-types";
import tests from "../data/tests.json";
import { Group, Header, SimpleCell } from "@vkontakte/vkui";
import {
  Icon28CheckCircleFill,
  Icon28CancelCircleFillRed,
} from "@vkontakte/icons";

const Achievements = () => {
  const [achivement, setAchivement] = useState(() =>
    tests.map((test) => test.achivement)
  );

  const haveAchive = (name) => {
    const currentAchives = localStorage.getItem("achivement");

    if (currentAchives?.length) {
      return JSON.parse(currentAchives)[name];
    }
    return false;
  };
  return (
    <Group>
      {achivement.map((achive) => (
        <SimpleCell
          id={achive.id}
          key={achive.id}
          className={haveAchive(achive.id) ? '' : 'opacity-50'}
          after={
            haveAchive(achive.id) ? (
              <Icon28CheckCircleFill />
            ) : (
              <Icon28CancelCircleFillRed />
            )
          }
        >
          {achive.name}
        </SimpleCell>
      ))}
    </Group>
  );
};

export default Achievements;
