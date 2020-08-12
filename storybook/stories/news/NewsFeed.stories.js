// @flow
// eslint-disable-file no-unused-vars
import React from 'react';
import { omit } from 'lodash';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, select, number, withKnobs } from '@storybook/addon-knobs';
import StoryDecorator from '../_support/StoryDecorator';
import NewsFeed from '../../../source/renderer/app/components/news/NewsFeed';
import News from '../../../source/renderer/app/domains/News';
import { dateOptions } from '../_support/profileSettings';
import { DATE_ENGLISH_OPTIONS } from '../../../source/renderer/app/config/profileConfig';
import { updateEN, updateJP } from './_utils/fakeDataUpdate';
import { getNewsItem } from './_utils/fakeDataNewsFeed';

const newsData = [
  getNewsItem(1, 'incident'),
  getNewsItem(2, 'incident', true),
  getNewsItem(3, 'alert'),
  getNewsItem(4, 'alert', true),
  getNewsItem(5, 'announcement'),
  getNewsItem(6, 'announcement', true),
  getNewsItem(7, 'info'),
  getNewsItem(8, 'info', true),
];

const newsEn = [
  ...newsData,
  new News.News({
    ...updateEN,
    target: {
      daedalusVersion: updateEN.target.daedalusVersion,
      platform: 'darwin',
    },
    id: 9,
    read: false,
  }),
];

const newsJp = [
  ...newsData,
  new News.News({
    ...updateJP,
    target: {
      daedalusVersion: updateJP.target.daedalusVersion,
      platform: 'darwin',
    },
    id: 9,
    read: false,
  }),
];

export const news = {
  'en-US': newsEn,
  'ja-JP': newsJp,
};

const updateDownloadProgressOptions = {
  range: true,
  min: 0,
  max: 100,
  step: 1,
};

storiesOf('News|NewsFeed', module)
  .addDecorator((story, context) => (
    <StoryDecorator>{withKnobs(story, context)}</StoryDecorator>
  ))

  // ====== Stories ======

  .add('Empty', () => (
    <div>
      <NewsFeed
        onGoToRoute={action('onGoToRoute')}
        isLoadingNews={false}
        onMarkNewsAsRead={action('onMarkNewsAsRead')}
        onNewsItemActionClick={action('onNewsItemActionClick')}
        onClose={action('onClose')}
        news={new News.NewsCollection([])}
        isNewsFeedOpen={boolean('isNewsFeedOpen', true)}
        onOpenExternalLink={action('onOpenExternalLink')}
        onOpenAlert={action('onOpenAlert')}
        onProceedNewsAction={action('onOpenExternalLink')}
        onOpenAppUpdate={action('onOpenAppUpdate')}
        currentDateFormat=" "
      />
    </div>
  ))

  .add('Fetching', () => (
    <div>
      <NewsFeed
        onGoToRoute={action('onGoToRoute')}
        isLoadingNews
        onMarkNewsAsRead={action('onMarkNewsAsRead')}
        onNewsItemActionClick={action('onNewsItemActionClick')}
        onClose={action('onClose')}
        news={new News.NewsCollection([])}
        isNewsFeedOpen={boolean('isNewsFeedOpen', true)}
        onOpenExternalLink={action('onOpenExternalLink')}
        onOpenAlert={action('onOpenAlert')}
        onProceedNewsAction={action('onOpenExternalLink')}
        onOpenAppUpdate={action('onOpenAppUpdate')}
        currentDateFormat=" "
      />
    </div>
  ))

  .add('Fetched', ({ locale }: { locale: string }) => {
    const displayAppUpdateNewsItem = boolean('displayAppUpdateNewsItem', true);
    const updateDownloadProgress = displayAppUpdateNewsItem
      ? number('updateDownloadProgress', 30, updateDownloadProgressOptions)
      : 0;

    return (
      <div>
        <NewsFeed
          onGoToRoute={action('onGoToRoute')}
          isLoadingNews={false}
          onMarkNewsAsRead={action('onMarkNewsAsRead')}
          onNewsItemActionClick={action('onNewsItemActionClick')}
          onClose={action('onClose')}
          news={new News.NewsCollection(news[locale])}
          isNewsFeedOpen={boolean('isNewsFeedOpen', true)}
          onOpenExternalLink={action('onOpenExternalLink')}
          onOpenAlert={action('onOpenAlert')}
          onProceedNewsAction={action('onOpenExternalLink')}
          displayAppUpdateNewsItem={displayAppUpdateNewsItem}
          updateDownloadProgress={updateDownloadProgress}
          onOpenAppUpdate={action('onOpenAppUpdate')}
          currentDateFormat={select(
            'currentDateFormat',
            dateOptions,
            DATE_ENGLISH_OPTIONS[0].value
          )}
        />
      </div>
    );
  });
