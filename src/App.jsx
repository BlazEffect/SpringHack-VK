import React, { useEffect, useState } from "react";
import bridge from '@vkontakte/vk-bridge';

import {
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
  TabbarItem,
  Tabbar,
  Epic,
  Progress,
  useAdaptivityConditionalRender,
  Panel,
  PanelHeader,
} from "@vkontakte/vkui";

import {
  Icon28SearchOutline,
  Icon28DiamondOutline,
  Icon28HomeOutline,
  Icon28QuestionOutline
} from "@vkontakte/icons";



import Achievements from "./panels/pages/Achievements";
import Tests from "./panels/pages/Tests";
import Categories from "./panels/pages/Categories";
import Search from "./panels/pages/Search";

import "@vkontakte/vkui/dist/vkui.css";
import "./index.css";

const App = () => {
  const [activePanel, setActivePanel] = useState("categories");
  const [section, setSection] = useState(null);
  const [progressValue, setProgressValue] = useState(0);
  const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
  const { viewWidth } = useAdaptivityConditionalRender();
  const onStoryChange = (e) => setActivePanel(e.currentTarget.dataset.story);

  const setActiveSection = ({ section }) => {
    setSection(section);
    setActivePanel("category");
  };

  const getDocHeight = () => {
    return Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
  }

  const calculateScroll = () => {
    const scrollTop = window.pageYOffset;
    const winHeight = window.innerHeight;
    const docHeight = getDocHeight();

    const totalDocScrollLength = docHeight - winHeight;
    const scrollPostion = Math.floor((scrollTop / totalDocScrollLength) * 100);
    setProgressValue(scrollPostion)
  };

  useEffect(() => {
    async function fetchData() {
      setPopout(null);
      await bridge.send('VKWebAppInit')
    }
    fetchData();
    window.addEventListener("scroll", (e) => {
      requestAnimationFrame(() => {
        calculateScroll();
      });
    });
  }, []);

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout popout={popout}>
            <SplitCol>
              <Panel className="relative mb-0 sm:mb-12">
                <PanelHeader>Язык жестов</PanelHeader>
                <div className="fixed w-full z-50 bottom-12">
                  {progressValue ? <Progress value={progressValue} /> : ''}
                </div>
                <View activePanel={activePanel}>
                  <Categories id='categories' />
                  <Achievements id='achievements' />
                  <Search id='search' />
                  <Tests id='tests' />
                </View>
              </Panel>

              <Epic
                activeStory={activePanel}
                tabbar={
                  viewWidth.tabletMinus && (
                    <Tabbar className={viewWidth.tabletMinus.className}>
                      <TabbarItem
                        onClick={onStoryChange}
                        selected={activePanel === "categories"}
                        data-story="categories"
                        text="Главная"
                      >
                        <Icon28HomeOutline width={20} height={20} />
                      </TabbarItem>
                      <TabbarItem
                        onClick={onStoryChange}
                        selected={activePanel === "achievements"}
                        data-story="achievements"
                        text="Достижения"
                      >
                        <Icon28DiamondOutline width={20} height={20} />
                      </TabbarItem>

                      <TabbarItem
                        onClick={onStoryChange}
                        selected={activePanel === "search"}
                        data-story="search"
                        text="Поиск"
                      >
                        <Icon28SearchOutline width={20} height={20} />
                      </TabbarItem>

                      <TabbarItem
                        onClick={onStoryChange}
                        selected={activePanel === "tests"}
                        data-story="tests"
                        text="Тестирование"
                      >
                        <Icon28QuestionOutline
                          width={20}
                          height={20}
                        />
                      </TabbarItem>
                    </Tabbar>
                  )
                }
              ></Epic>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
