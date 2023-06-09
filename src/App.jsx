import React, {useEffect, useState} from "react";
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


import Achievements from "./pages/Achievements";
import Tests from "./pages/Tests";
import Categories from "./pages/Categories";
import Search from "./pages/Search";

import MainPicture from "./assets/image/main_picture.png";

import "@vkontakte/vkui/dist/vkui.css";
import "./assets/css/index.css";

const App = () => {
  const [activePanel, setActivePanel] = useState("categories");
  const [section, setSection] = useState(null);
  const [progressValue, setProgressValue] = useState(0);
  const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);
  const [loading, setLoading] = useState(true);
  const [mainPicture, setMainPicture] = useState(null);
  const {viewWidth} = useAdaptivityConditionalRender();
  const onStoryChange = (e) => setActivePanel(e.currentTarget.dataset.story);

  const setActiveSection = ({section}) => {
    setSection(section);
    setActivePanel("category");
  };

  const getDocHeight = () => {
    return Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
  };

  const calculateScroll = () => {
    const scrollTop = window.pageYOffset;
    const winHeight = window.innerHeight;
    const docHeight = getDocHeight();

    const totalDocScrollLength = docHeight - winHeight;
    const scrollPosition = Math.floor((scrollTop / totalDocScrollLength) * 100);
    setProgressValue(scrollPosition);
  };

  const getBase64Image = async (path) => {
    setLoading(true);
    const blob = await fetch(path).then(res => res.blob());

    const fileReader = new FileReader();
    fileReader.readAsDataURL(blob);
    fileReader.onloadend = function () {
      setLoading(false);
      setMainPicture(fileReader.result);
    };
  };

  async function fetchData() {
    setPopout(null);
    await bridge.send('VKWebAppInit');
  }

  function fetchOnce() {
    bridge.send('VKWebAppShowSlidesSheet', {
      slides: [
        {
          media: {
            blob: mainPicture,
            type: 'image'
          },
          title: 'Главная',
          subtitle: 'На главной вы можете увидеть разделы жестов при переходе в которые будет высвечен список жестов.'
        },
        {
          media: {
            blob: mainPicture,
            type: 'image'
          },
          title: 'Достижения',
          subtitle: 'Во вкладке достижения отображается список доступных и полученных достижений'
        },
        {
          media: {
            blob: mainPicture,
            type: 'image'
          },
          title: 'Поиск',
          subtitle: 'Во вкладке поиск вы можете быстро найти интересующий вас жест'
        },
        {
          media: {
            blob: mainPicture,
            type: 'image'
          },
          title: 'Тестирование',
          subtitle: 'Во вкладке тестирование вас ждёт небольшой тест на проверку ваших знаний'
        },
      ]
    })
  }

  useEffect(() => {
    fetchData();
    getBase64Image(MainPicture);
    window.addEventListener("scroll", (e) => {
      requestAnimationFrame(() => {
        calculateScroll();
      });
    });
  }, []);

  useEffect(() => {
    if (mainPicture !== null) {
      const isFetched = localStorage.getItem('fetchOnce');
      if (!isFetched) {
        fetchOnce()
        localStorage.setItem('fetchOnce', true)
      }
    }
  }, [mainPicture]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <ConfigProvider>
        <AdaptivityProvider>
          <AppRoot>
            <SplitLayout popout={popout}>
              <SplitCol>
                <Panel className="relative mb-0 sm:mb-12">
                  <PanelHeader>Язык жестов</PanelHeader>
                  <div className="fixed w-full z-50 bottom-12">
                    {progressValue ? <Progress value={progressValue}/> : ''}
                  </div>
                  <View activePanel={activePanel}>
                    <Categories id='categories'/>
                    <Achievements id='achievements'/>
                    <Search id='search'/>
                    <Tests id='tests'/>
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
                                <Icon28HomeOutline width={20} height={20}/>
                              </TabbarItem>
                              <TabbarItem
                                  onClick={onStoryChange}
                                  selected={activePanel === "achievements"}
                                  data-story="achievements"
                                  text="Достижения"
                              >
                                <Icon28DiamondOutline width={20} height={20}/>
                              </TabbarItem>

                              <TabbarItem
                                  onClick={onStoryChange}
                                  selected={activePanel === "search"}
                                  data-story="search"
                                  text="Поиск"
                              >
                                <Icon28SearchOutline width={20} height={20}/>
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
