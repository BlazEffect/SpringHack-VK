import { ModalCard, ModalRoot, ModalCardBase, ButtonGroup, Button } from "@vkontakte/vkui";
import { Icon56GiftOutline } from '@vkontakte/icons';

const Modal = ({ text, onClose }) => (
  <ModalRoot activeModal='modalAchive'>
      <ModalCard id="modalAchive"
          header={`Получено достижение ${text}`}
          icon={<Icon56GiftOutline />}
          subheader="Достижение доступно во вкладке 'Достижения'"
          onClose={onClose}
        >
      </ModalCard>
  </ModalRoot>
);

export default Modal