'use strict';

import React from 'react';

const defaultInnerHtml = '<img src="http://placehold.it/118x128">';

export default class FamilyTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const $container = $('#family_tree_container');
    $container.orgchart({
      data: {
        id: 'root_node',
        children: [{
          id: 'boss_node', innerHtml: defaultInnerHtml, title: 'Don',
          children: [{ id: 'underboss_node', innerHtml: defaultInnerHtml, title: 'Underboss' }]
        }, {
          id: 'consigliere_node', innerHtml: defaultInnerHtml, title: 'Consigliere'
        }]
      },
      chartClass: 'family-tree-chart w-100 mt-2 pos-relative',
      nodeTitle: 'innerHtml',
      nodeContent: 'title',
      parentNodeSymbol: 'd-none'
    });

    $('.orgchart > table', $container).children('tr:nth-child(1), tr:nth-child(2), tr:nth-child(3)').hide();
    this.refreshConsigliereNodeLayout();

    this.$container = $container;
  }

  refreshConsigliereNodeLayout() {
    const $orgchart = $('.orgchart', this.$container);
    const $consigliereNode = $('#consigliere_node');
    const $vLineFromBossNode = $('#boss_node').closest('tr').next('.lines').find('.downLine:first');
    const orgchartOffset = $orgchart.offset();
    const lineWidth = 120;

    if (!$consigliereNode.parent().hasClass('orgchart')) {
      const $lineEl = $(`<div class="downLine m-0 pos-absolute" style="height: 2px; width: ${lineWidth}px; background: none; border-top: 2px dashed rgba(217, 83, 79, 0.8); transition: none;"></div>`);
      const $consigliereNodeTd = $consigliereNode.closest('table').parent('td');

      $consigliereNode.appendTo($orgchart).addClass('pos-absolute').css('transition', 'none');
      $consigliereNodeTd.remove();
      $lineEl.appendTo($orgchart);
    }

    $consigliereNode
      .css('left', `${$vLineFromBossNode.offset().left - orgchartOffset.left + lineWidth}px`)
      .css('top', `${$vLineFromBossNode.offset().top - orgchartOffset.top - 55}px`)
      .next()
      .css('left', `${$vLineFromBossNode.offset().left - orgchartOffset.left}px`)
      .css('top', `${$vLineFromBossNode.offset().top - orgchartOffset.top + 20}px`);
  }

  handleAddCapoClick = e => {
    const { $container } = this;
    const $underbossNode = $('#underboss_node');

    if ($container.orgchart('getNodeState', $underbossNode, 'children').exist) {
      $container.orgchart('addSiblings', $underbossNode.closest('tr').siblings('.nodes').find('.node:first'), {
        siblings: [{ innerHtml: defaultInnerHtml, title: 'Capo', relationship: '110' }]
      });
    } else {
      $container.orgchart('addChildren', $underbossNode, {
        children: [{ innerHtml: defaultInnerHtml, title: 'Capo', relationship: '100' }]
      });
    }

    this.refreshConsigliereNodeLayout();
  }

  render() {
    const { bossNodeAdded, underbossNodeAdded, consigliereNodeAdded } = this.state;

    return (
      <div className={`d-flex justify-content-center p-3`}>
        <div id="family_tree_container">
          <div>
            <button type="button" role="button" className="btn btn-sm btn-outline-primary" onClick={this.handleAddCapoClick}>+ Capo</button>
            <button type="button" role="button" className="btn btn-sm btn-outline-primary ml-2" disabled={true}>+ Soldier</button>
          </div>
        </div>
      </div>
    );
  }
}
