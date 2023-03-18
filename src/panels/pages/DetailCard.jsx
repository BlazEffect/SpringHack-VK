import { ContentCard, Title, Panel, CardGrid, Group } from "@vkontakte/vkui";

const DetailCard = ({ category }) => {
  return (
    <>
      <Title>{category.name}</Title>
      {category.text ? (
        /* есть текст - рендерим только его */
        <div>{category.text}</div>
      ) : (
        <Group style={{marginTop: '20px'}}>
          <div>
            {category.items.map((lesson, i) => (
              <Title style={{marginTop: '15px'}} key={i}>{lesson.name}</Title>
            ))}
          </div>
        </Group>
      )}
    </>
  );
};

export default DetailCard;
