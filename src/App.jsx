import React, {useEffect, useState} from 'react';

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
  useAdaptivityConditionalRender, Panel, PanelHeader,
} from '@vkontakte/vkui';

import {
  Icon28MoreHorizontalCircleFillGray,
  Icon28SearchOutline,
  Icon28DiamondOutline, Icon28HomeOutline,
} from "@vkontakte/icons";

import Achievements from "./panels/pages/Achievements";
import Settings from "./panels/pages/Settings";
import Category from "./panels/pages/Category";
import Categories from "./panels/pages/Categories";
import Search from "./panels/pages/Search";
import Element from "./panels/pages/Element";

import '@vkontakte/vkui/dist/vkui.css';

const App = () => {
  const [activePanel, setActivePanel] = useState('categories');

  const [section, setSection] = useState(null);
  const [lesson, setLesson] = useState(null);

  const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
  const { viewWidth } = useAdaptivityConditionalRender();
  const onStoryChange = (e) => setActivePanel(e.currentTarget.dataset.story);

  const setActiveSection = ({section}) => {
    console.log(section)
    setSection(section);
    setActivePanel('category');
  };

  const setActiveLesson = ({lesson}) => {
    setLesson(lesson);
    setActivePanel('element');
  };

  useEffect(() => {
    async function fetchData() {
      setPopout(null);
    }
    fetchData();
  }, []);

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout popout={popout}>
            <SplitCol>
              <Panel>
                <PanelHeader>Язык жестов</PanelHeader>

                <View activePanel={activePanel}>
                  <Categories id='categories' activeSection={setActiveSection} />
                  <Achievements id='achievements' />
                  <Search id='search' />
                  <Settings id='settings' />

                  <Category id='category' />
                  <Element id='element' />
                </View>
              </Panel>

              <Epic
                activeStory={activePanel}
                tabbar={
                  viewWidth.tabletMinus && (
                    <Tabbar className={viewWidth.tabletMinus.className}>
                      <TabbarItem
                        onClick={onStoryChange}
                        selected={activePanel === 'categories'}
                        data-story="categories"
                        text="Главная"
                      >
                        <Icon28HomeOutline width={20} height={20} />
                      </TabbarItem>
                      <TabbarItem
                        onClick={onStoryChange}
                        selected={activePanel === 'achievements'}
                        data-story="achievements"
                        text="Достижения"
                      >
                        <Icon28DiamondOutline width={20} height={20} />
                      </TabbarItem>

                      <TabbarItem
                        onClick={onStoryChange}
                        selected={activePanel === 'search'}
                        data-story="search"
                        text="Поиск"
                      >
                        <Icon28SearchOutline width={20} height={20} />
                      </TabbarItem>

                      <TabbarItem
                        onClick={onStoryChange}
                        selected={activePanel === 'settings'}
                        data-story="settings"
                        text="Настройки"
                      >
                        <Icon28MoreHorizontalCircleFillGray width={20} height={20} />
                      </TabbarItem>
                    </Tabbar>
                  )
                }
              >
              </Epic>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}

export default App;