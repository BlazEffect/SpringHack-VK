import PropTypes from "prop-types";
import data from '../../data.json';
import {CardGrid, ContentCard, Group} from "@vkontakte/vkui";

const Categories = ({activeSection}) => (
  <div>
    <Group>
      <CardGrid size="l">
        {
          data.map((category, i) => {
            console.log(i);
            return (
              <ContentCard
                header={category.name}
                caption={category.description}
                marginHeight='50'
                onClick={() => activeSection(category)}
              />
            )
          })
        }
      </CardGrid>
    </Group>
  </div>
);

Categories.propTypes = {
  id: PropTypes.string.isRequired
};

export default Categories