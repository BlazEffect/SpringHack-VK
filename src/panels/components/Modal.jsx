import { ModalCard, ModalRoot, ModalCardBase, ButtonGroup, Button } from "@vkontakte/vkui";
import { Icon56GiftOutline } from '@vkontakte/icons';

const Modal = ({ text, open }) => (
  <ModalRoot activeModal='modalAchive'>
      <ModalCard id="modalAchive"
          header={`Получено достижение ${text}`}
          icon={<Icon56GiftOutline />}
          subheader="Достижение доступно во вкладке 'Достижения'"
          actions={
            <ButtonGroup align="center" mode="vertical" gap="s" stretched>
              <Button size="l" mode="primary">
                ОК
              </Button>
            </ButtonGroup>
          }
        >
      </ModalCard>
  </ModalRoot>
);

export default Modal