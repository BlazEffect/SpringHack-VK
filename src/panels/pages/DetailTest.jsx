import { useEffect, useState, Fragment } from "react";
import {
  FormLayoutGroup,
  Panel,
  Title,
  View,
  FormLayout,
  SegmentedControl,
  RadioGroup,
  FormItem,
  Button,
  Radio,
  Text
} from "@vkontakte/vkui";
import videos from "../../Videos";
import Modal from "../components/Modal";

const DetailTest = ({ test }) => {
  const [inputAnswers, setInputAnswers] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const setAnswer = (id, value) => {
    const answer = test.answers.find((item) => item.id === id);
    const active = {
      ...inputAnswers,
      [id]: { value, correct: answer.correct === value },
    };
    setInputAnswers(active);
  };

  function handleSubmit() {
    const achivement = test.achivement;
    const count = Object.values(inputAnswers).filter(
      (answer) => answer.correct
    )?.length;

    if (count === achivement.answersCount) {
      if (localStorage.getItem("achivement")) {
        let achives = localStorage.getItem("achivement");
        if(JSON.parse(achives)[achivement.id]) {
          return;
        }
        setOpenModal(true);
        achives = { ...JSON.parse(achives), [achivement.id]: true };
        localStorage.setItem("achivement", JSON.stringify(achives));
        return;
      }

      localStorage.setItem(
        "achivement",
        JSON.stringify({ [achivement.id]: true })
      );
    }
  }

  useEffect(() => {
    console.log(inputAnswers);
  }, [inputAnswers]);
  return (
    <>
      <Title className="mx-auto">{test.name}</Title>
      <FormLayout onSubmit={handleSubmit}>
        {test.answers.map((answer) => (
          <FormLayoutGroup key={answer.id} className="mt-4">
            <FormItem required className="w-full mx-auto">
              <Title level="2" className="text-center">
                {answer.name}
              </Title>
              <video
                loop
                className="relative video mx-auto"
                autoPlay
                src={videos[answer.video]}
              >
                <source type="video/mp4" />
              </video>
              {/* <SegmentedControl
                  size="l"
                  className="max-w-[600px] flex justify-center items-center mx-auto mt-4"
                  options={answer.options.map((option) => ({
                    label: option,
                    value: option,
                  }))}
                /> */}
              <RadioGroup
                mode="horizontal"
                className="flex justify-center !mx-auto mt-4 items-center"
              >
                {answer.options.map((option) => (
                  <Fragment key={option.id}>
                    <Radio
                      onChange={(e) => setAnswer(answer.id, e.target.value)}
                      value={option}
                      className="max-w-fit"
                      name={answer.name}
                    >
                      {option}
                    </Radio>
                  </Fragment>
                ))}
              </RadioGroup>
            </FormItem>
          </FormLayoutGroup>
        ))}
        <FormItem className="w-full flex justify-center items-center">
          <Button
            stretched
            onClick={handleSubmit}
            className="mt-4 mb-12 lg:mb-0 w-full sm:max-w-[300px]"
          >
            Отправить
          </Button>
        </FormItem>
      </FormLayout>
      {openModal && (
        <Modal
          text={test.achivement.name}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default DetailTest;
