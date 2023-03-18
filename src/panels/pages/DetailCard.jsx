import { ContentCard, Group, Title } from "@vkontakte/vkui"

const DetailCard = ({ lesson }) => (
    <Group>
        <ContentCard 
            header={lesson.name}
            className="detail-card"
            /* todo delete hardcode */
            src={'https://cakeshop.com.ua/images/6eRbfrsEzMM/h:1000/bG9jYWw/6Ly8vY2FrZXNob3AuY29tLnVhL3B1YmxpY19odG1sL3N0b3JhZ2UvYXBwL3B1YmxpYy9pbWcvcHJvZHVjdC85NDc0XzEuanBn'}
            text={lesson.description}
        />
    </Group>
)

export default DetailCard