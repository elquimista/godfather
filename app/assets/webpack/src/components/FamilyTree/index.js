'use strict';

import React from 'react';
import uuid from 'uuid';

const defaultInnerHtml =
  '<img class="avatar" src="http://placehold.it/118x128" width="118" height="128">' +
  '<div class="overlay pos-absolute w-100 h-100 transparent">' +
    '<div class="pos-absolute w-100 h-100" style="left: 0; top: 0; background-color: black; opacity: .7;"></div>' +
    '<p class="info pos-absolute w-100 p-1" style="line-height: 23px;"></p>' +
  '</div>'
  ;

function getNodeData(treeData, id) {
  let foundItem = null;

  if (treeData.id === id) {
    foundItem = treeData;
  } else {
    if (Array.isArray(treeData.children)) {
      for (let child of treeData.children) {
        foundItem = getNodeData(child, id);
        if (foundItem) break;
      }
    }
  }

  return foundItem;
}

export default class FamilyTree extends React.Component {
  constructor(props) {
    super(props);

    if (props.familyTree.raw_data) {
      this.treeData = JSON.parse(props.familyTree.raw_data);
    } else {
      this.treeData = {
        id: 'root_node',
        children: [{
          id: 'boss_node', innerHtml: defaultInnerHtml, title: 'Don',
          children: [{ id: 'underboss_node', innerHtml: defaultInnerHtml, title: 'Underboss', children: [] }]
        }, {
          id: 'consigliere_node', innerHtml: defaultInnerHtml, title: 'Consiglieri'
        }]
      };
    }

    this.state = {
      $selectedNode: null
    };
  }

  componentDidMount() {
    const $container = $('#family_tree_container');
    $container.orgchart({
      data: this.treeData,
      chartClass: 'family-tree-chart w-100 mt-2 pos-relative pt-0',
      nodeTitle: 'innerHtml',
      nodeContent: 'title',
      parentNodeSymbol: 'd-none'
    });

    $('.orgchart > table', $container).children('tr:nth-child(1), tr:nth-child(2), tr:nth-child(3)').hide();
    this.refreshConsigliereNodeLayout();
    this.addDragDropEventHandlersToNodes(this.treeData);

    $container
      .on('mouseover', '.node .title', e => {
        $(e.currentTarget).find('.overlay').removeClass('transparent');
      })
      .on('mouseout', '.node .title', e => {
        $(e.currentTarget).find('.overlay').addClass('transparent');
      })
      .on('click', e => {
        this.setState({ $selectedNode: $container.find('.node.focused') });
      });

    this.$container = $container;
  }

  addDragDropEventHandlersToNodes = nodeData => {
    const el = document.getElementById(nodeData.id);
    el.ondragover = this.handleDragOver;
    el.ondrop = this.handleDrop;

    if (Array.isArray(nodeData.children)) {
      for (let child of nodeData.children) {
        this.addDragDropEventHandlersToNodes(child);
      }
    }
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
    const underbossNodeData = getNodeData(this.treeData, 'underboss_node');
    const capoNodeId = `capo_node_${uuid()}`;
    let capoNodeData;

    if ($container.orgchart('getNodeState', $underbossNode, 'children').exist) {
      capoNodeData = { id: capoNodeId, innerHtml: defaultInnerHtml, title: 'Capo', className: 'capo-node', relationship: '110' };
      $container.orgchart('addSiblings', $underbossNode.closest('tr').siblings('.nodes').find('.node:first'), {
        siblings: [capoNodeData]
      });
    } else {
      capoNodeData = { id: capoNodeId, innerHtml: defaultInnerHtml, title: 'Capo', className: 'capo-node', relationship: '100' };
      $container.orgchart('addChildren', $underbossNode, { children: [capoNodeData] });
    }

    underbossNodeData.children.push(capoNodeData);
    this.saveFamilyTreeData();
    this.addDragDropEventHandlersToNodes(capoNodeData);
    this.refreshConsigliereNodeLayout();
  }

  handleDragOver = e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }

  handleDrop = e => {
    e.preventDefault();

    let person = e.dataTransfer.getData('person');

    if (person) {
      const { imagePaths, routes } = window._SHARED_DATA;
      const { onProfileDropped, familyTree } = this.props;
      const $targetEl = $(e.currentTarget);
      const nodeData = getNodeData(this.treeData, $targetEl.attr('id'));
      if (nodeData.personId) return;

      const $nodeInnerHtml = $(`<div>${nodeData.innerHtml}</div>`);

      person = JSON.parse(person);
      $nodeInnerHtml.find('.avatar').attr('src', person.photo_md_url || imagePaths['person-default-avatar.png']);
      $nodeInnerHtml.find('.overlay .info').text(person.full_name);
      nodeData.innerHtml = $nodeInnerHtml.html();
      nodeData.personId = person.id;
      $targetEl.find('.avatar').attr('src', person.photo_md_url || imagePaths['person-default-avatar.png']);
      $targetEl.find('.overlay .info').text(person.full_name);

      $.ajax({
        url: routes.personPath(person.id, { format: 'json' }),
        method: 'patch',
        data: { person: { status: 'appointed' } }
      });
      onProfileDropped && onProfileDropped(person);
      this.saveFamilyTreeData();
    }
  }

  saveFamilyTreeData = () => {
    $.ajax({
      url: window._SHARED_DATA.routes.familyTreePath(this.props.familyTree.id, { format: 'json' }),
      method: 'patch',
      data: { family_tree: { raw_data: JSON.stringify(this.treeData) } }
    });
  }

  render() {
    const { bossNodeAdded, underbossNodeAdded, consigliereNodeAdded, $selectedNode } = this.state;

    return (
      <div className={`d-flex justify-content-center p-3`}>
        <div id="family_tree_container">
          <div>
            <button type="button" role="button" className="btn btn-sm btn-outline-primary" onClick={this.handleAddCapoClick}>+ Capo</button>
            <button type="button" role="button" className="btn btn-sm btn-outline-primary ml-2" disabled={true}>+ Soldier</button>
            <button type="button" role="button" className="btn btn-sm btn-outline-primary ml-2" disabled={$selectedNode === null || $selectedNode.length === 0}>Dismiss</button>
          </div>
        </div>
      </div>
    );
  }
}
