'use strict';

import React from 'react';
import uuid from 'uuid';
import Snap from 'snapsvg';

export default class _HaloMenuForDeceasedItem extends React.Component {
  constructor(props) {
    super(props);

    this.menuId = `menu_${uuid()}`;
    this.symbolsContainerId = `symbolsContainer_${uuid()}`;
    this.iconOneId = `iconOne_${uuid()}`;
    this.iconTwoId = `iconTwo_${uuid()}`;
    this.iconThreeId = `iconThree_${uuid()}`;
    this.itemsContainerId = `itemsContainer_${uuid()}`;
    this.itemOneId = `itemOne_${uuid()}`;
    this.itemTwoId = `itemTwo_${uuid()}`;
    this.itemThreeId = `itemThree_${uuid()}`;
    this.triggerId = `trigger_${uuid()}`;
  }

  componentDidMount() {
    const { menuId, itemsContainerId, triggerId, itemOneId, itemTwoId, itemThreeId } = this;
    const svg = document.getElementById(menuId);
    const itemsContainer = document.getElementById(itemsContainerId);
    const trigger = document.getElementById(triggerId);
    const label = trigger.querySelectorAll('text')[0];
    const items = Snap(itemsContainer);
    const originalTransform = itemsContainer.getAttribute('transform');
    let open = false;
    const { menuHandlers } = this.props;

    items.animate({ transform: 's0,0,250,250', opacity: 0 }, 0.005);
    svg.style.pointerEvents = 'none';

    trigger.addEventListener('click', e => {
      e.stopPropagation();
      open = !open;
      if (open) {
        items.animate({ transform: originalTransform, opacity: 1 }, 1000, mina.elastic);
        label.innerHTML = '-';
        svg.style.pointerEvents = 'auto';
      } else {
        items.animate({ transform: 's0,0,250,250', opacity: 0 }, 400, mina.backin);
        label.innerHTML = '+';
        svg.style.pointerEvents = 'none';
      }
    }, false);

    svg.onclick = e => e.stopPropagation();

    document.getElementById(itemOneId).onclick = menuHandlers[0];
    document.getElementById(itemTwoId).onclick = menuHandlers[1];
    document.getElementById(itemThreeId).onclick = menuHandlers[2];
  }

  render() {
    const { menuId, symbolsContainerId, iconOneId, iconTwoId, iconThreeId, itemsContainerId, itemOneId, itemTwoId, itemThreeId, triggerId } = this;
    const { menuHandlers, ...otherProps } = this.props;

    return (
      <div {...otherProps}>
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-100 -100 700 350" id={menuId} style={{transformOrigin: '50% 50% 0px', transform: 'matrix3d(0.999989, 0.0047164, 0, 0, -0.0047164, 0.999989, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)', touchAction: 'none', userSelect: 'none'}}>
          <style>
            {`#menu{display:block;margin:0 auto;}a{cursor:pointer;outline:none;}.item .sector{transition:all .1s linear;fill:#fff;stroke:#111;}.item:hover .sector,.item:focus .sector{fill:#eee;}.menu-trigger{fill:#EA2A55;pointer-events:auto;}.menu-trigger:hover,.menu-trigger:focus{cursor:pointer;}symbol{overflow:visible;}`}
          </style>
          <g id={symbolsContainerId}>
            <symbol className="icon icon-" id={iconOneId} viewBox="0 0 40 40">
              <g transform="translate(0.000000,128.000000) scale(0.100000,-0.100000)" fill="#444444" stroke="none">
                <path d="M403 1156 c-96 -31 -143 -98 -143 -202 1 -104 55 -188 228 -357 109
                -105 137 -122 177 -107 33 13 214 187 272 262 67 88 86 138 81 218 -5 86 -36
                137 -105 171 -66 33 -170 33 -230 2 l-43 -23 -42 22 c-51 27 -137 33 -195 14z
                m131 -69 c9 -15 7 -21 -8 -33 -11 -8 -29 -14 -41 -14 -31 0 -83 -50 -93 -90
                -7 -28 -13 -35 -33 -35 -19 0 -25 6 -27 29 -7 59 43 126 114 152 48 17 74 14
                88 -9z" />
                <path d="M17 886 c-3 -8 -9 -61 -13 -118 l-7 -105 42 -97 c63 -146 76 -163
                186 -231 147 -91 157 -101 163 -168 l4 -57 103 0 103 0 7 84 c7 77 5 89 -18
                140 -47 103 -148 176 -244 176 -37 0 -61 17 -133 90 -64 66 -112 92 -133 71
                -10 -10 6 -39 74 -131 19 -24 28 -41 21 -36 -24 14 -112 139 -112 158 0 10 6
                21 14 24 15 6 14 34 -5 143 -10 62 -38 93 -52 57z" />
                <path d="M1233 892 c-12 -8 -26 -67 -36 -159 -4 -30 -1 -43 9 -47 8 -3 14 -14
                14 -24 0 -18 -90 -144 -113 -159 -6 -4 3 13 22 37 68 92 84 121 74 131 -21 21
                -69 -5 -133 -71 -72 -73 -96 -90 -133 -90 -96 0 -197 -73 -244 -176 -23 -51
                -25 -63 -18 -140 l7 -84 103 0 103 0 4 57 c6 67 16 77 163 168 110 68 123 85
                186 231 l42 97 -7 105 c-9 132 -13 143 -43 124z" />
              </g>
            </symbol>
            <symbol className="icon icon-" id={iconTwoId} viewBox="0 0 40 40">
              <g>
                <path d="M640.35,91.169H536.971V23.991C536.971,10.469,526.064,0,512.543,0c-1.312,0-2.187,0.438-2.614,0.875
                  C509.491,0.438,508.616,0,508.179,0H265.212h-1.74h-1.75c-13.521,0-23.99,10.469-23.99,23.991v67.179H133.916
                  c-29.667,0-52.783,23.116-52.783,52.783v38.387v47.981h45.803v491.6c0,29.668,22.679,52.346,52.346,52.346h415.703
                  c29.667,0,52.782-22.678,52.782-52.346v-491.6h45.366v-47.981v-38.387C693.133,114.286,670.008,91.169,640.35,91.169z
                   M285.713,47.981h202.84v43.188h-202.84V47.981z M599.349,721.922c0,3.061-1.312,4.363-4.364,4.363H179.282
                  c-3.052,0-4.364-1.303-4.364-4.363V230.32h424.431V721.922z M644.715,182.339H129.551v-38.387c0-3.053,1.312-4.802,4.364-4.802
                  H640.35c3.053,0,4.365,1.749,4.365,4.802V182.339z" />
                <rect x="475.031" y="286.593" width="48.418" height="396.942" />
                <rect x="363.361" y="286.593" width="48.418" height="396.942" />
                <rect x="251.69" y="286.593" width="48.418" height="396.942" />
              </g>
            </symbol>
            <symbol className="icon icon-" id={iconThreeId} viewBox="0 0 40 40">
              <g>
                <path d="M149.996,0C67.157,0,0.001,67.161,0.001,149.997S67.157,300,149.996,300s150.003-67.163,150.003-150.003    S232.835,0,149.996,0z M221.302,107.945l-14.247,14.247l-29.001-28.999l-11.002,11.002l29.001,29.001l-71.132,71.126    l-28.999-28.996L84.92,186.328l28.999,28.999l-7.088,7.088l-0.135-0.135c-0.786,1.294-2.064,2.238-3.582,2.575l-27.043,6.03    c-0.405,0.091-0.817,0.135-1.224,0.135c-1.476,0-2.91-0.581-3.973-1.647c-1.364-1.359-1.932-3.322-1.512-5.203l6.027-27.035    c0.34-1.517,1.286-2.798,2.578-3.582l-0.137-0.137L192.3,78.941c1.678-1.675,4.404-1.675,6.082,0.005l22.922,22.917    C222.982,103.541,222.982,106.267,221.302,107.945z" fill="#444444" />
              </g>
            </symbol>
          </g>
          <g id={itemsContainerId}>
            <a className="item" id={itemOneId} role="link" tabIndex="0" xlinkHref="" xlinkTitle=" " transform="matrix(1,0,0,1,0,0)" data-svg-origin="250 250">
              <path fill="none" stroke="#111" d="M330,250 l170,0 A250,250 0 0,0 375,33.49364905389035 l-85,147.22431864335456 A80,80 0 0,1 330,250" className="sector"></path>
              <use xlinkHref={`#${iconOneId}`} width="32" height="32" x="339.2602233886719" y="122.5" transform="rotate(0 393.7602233886719 167)"></use>
            </a>
            <a className="item" id={itemTwoId} role="link" tabIndex="0" xlinkHref="" xlinkTitle=" " transform="matrix(0.5,-0.86602,0.86602,0.5,-91.5063509461097,341.5063509461096)" data-svg-origin="250 250">
              <path fill="none" stroke="#111" d="M330,250 l170,0 A250,250 0 0,0 375,33.49364905389035 l-85,147.22431864335456 A80,80 0 0,1 330,250" className="sector"></path>
              <use xlinkHref={`#${iconTwoId}`} width="5" height="5" x="345.2602233886719" y="122.5" transform="rotate(60 393.7602233886719 167)"></use>
            </a>
            <a className="item" id={itemThreeId} role="link" tabIndex="0" xlinkHref="" xlinkTitle=" " transform="matrix(-0.49999,-0.86602,0.86602,-0.49999,158.49364905389027,591.5063509461096)" data-svg-origin="250 250">
              <path fill="none" stroke="#111" d="M330,250 l170,0 A250,250 0 0,0 375,33.49364905389035 l-85,147.22431864335456 A80,80 0 0,1 330,250" className="sector"></path>
              <use xlinkHref={`#${iconThreeId}`} width="13" height="13" x="347.2602233886719" y="122.5" transform="rotate(110 393.7602233886719 167)"></use>
            </a>
          </g>
          <g id={triggerId} className="trigger menu-trigger" role="button">
            <circle cx="250" cy="250" r="60"></circle>
            <text textAnchor="middle" x="250" y="247" fill="#fff" fontSize="5em">+</text>
          </g>
        </svg>
      </div>
    );
  }
}
