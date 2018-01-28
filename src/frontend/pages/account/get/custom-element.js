import React from 'react';
import ReactDOM from 'react-dom';
import register from '../../../common/register';
import PageLoadable from './PageLoadable';

/* globals HTMLElement */

export default class PageAccountGet extends HTMLElement {
  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const username = this.getAttribute('username');
    // eslint-disable-next-line react/jsx-filename-extension
    ReactDOM.render(<PageLoadable username={username} />, this);
  }
}

register('react-account-get', PageAccountGet);
