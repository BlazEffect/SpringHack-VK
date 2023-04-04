import { Button } from "@vkontakte/vkui";

const ButtonBack = ({ returnBack }) => (
  <div className="w-full flex justify-center items-center">
      <Button
        className="mt-4 mb-12 lg:mb-0 w-full sm:max-w-[300px]"
        onClick={returnBack}
      >
        Назад
      </Button>
  </div>
);

export default ButtonBack