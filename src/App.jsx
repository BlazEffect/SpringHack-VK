import React, { useState, useEffect } from 'react';
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
  usePlatform,
  useAdaptivityConditionalRender,
  Platform,
  PanelHeaderBack,
  Panel,
  PanelHeader,
  Group, Placeholder, Search
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/pages/Home';
import {
  Icon28NewsfeedOutline,
  Icon28MoreHorizontalCircleFillGray,
  Icon28SearchOutline,
  Icon28DiamondOutline, Icon28HomeOutline,
} from "@vkontakte/icons";

import { Icon20DiamondOutline } from '@vkontakte/icons';
import Achievements from "./panels/pages/Achievements";
import Settings from "./panels/pages/Settings";
import Category from "./panels/pages/Category";
import Categories from "./panels/pages/Categories";

const App = () => {
  const [activePanel, setActivePanel] = useState('home');
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
  const platform = usePlatform();
  const { viewWidth } = useAdaptivityConditionalRender();
  const onStoryChange = (e) => setActivePanel(e.currentTarget.dataset.story);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  const go = e => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout popout={popout}>
            <SplitCol className={viewWidth.tabletPlus.className} fixed width={280} maxWidth={280}>
            <SplitLayout>
              <View activePanel={activePanel}>
                <Home id='home'/>
                <Achievements id='achievements'/>
                <Search id='search'/>
                <Settings id='settings'/>

                <Category id='Category'/>
                <Categories id='Categories'/>
                <Element id='Element'/>
              </View>
            </SplitCol>

            <SplitCol>
              <Epic
                activeStory={activePanel}
                tabbar={
                  viewWidth.tabletMinus && (
                    <Tabbar className={viewWidth.tabletMinus.className}>
                      <TabbarItem
                        onClick={onStoryChange}
                        selected={activePanel === 'home'}
                        data-story="home"
                        text="Главная"
                      >
                        <Icon28HomeOutline width={20} height={20} />
                      </TabbarItem>
                      <TabbarItem
                        onClick={onStoryChange}
                        selected={activePanel === 'achievements'}
                        data-story="home"
                        text="Достижения"
                      >
                        <Icon28DiamondOutline width={20} height={20} />
                      </TabbarItem>

                      <TabbarItem
                          onClick={onStoryChange}
                          selected={activePanel === 'search'}
                          data-story="home"
                          text="Поиск"
                      >
                        <Icon28SearchOutline width={20} height={20} />
                      </TabbarItem>

                      <TabbarItem
                          onClick={onStoryChange}
                          selected={activePanel === 'settings'}
                          data-story="home"
                          text="Настройки"
                      >
                        <Icon28MoreHorizontalCircleFillGray width={20} height={20} />
                      </TabbarItem>
                    </Tabbar>
                  )
                }
              >
                <View id="home" activePanel="home">
                  <Panel id="home">
                    <PanelHeader before={<PanelHeaderBack />}>Новости</PanelHeader>
                    <Group style={{ height: '1000px' }}>
                      <Placeholder icon={<Icon56NewsfeedOutline width={56} height={56} />} />
                    </Group>
                  </Panel>
                </View>
              </Epic>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}

export default App;