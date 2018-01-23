import React, { Component,PropTypes } from 'react';
import { NavLink } from 'react-router-dom'
export default class SwitchList extends Component {
  renderFilter(filter, name) {
    if (filter === this.props.filter) {
      return name
    }

    return (
      <span  onClick={e => {
        e.preventDefault()
        this.props.onFilterChange(filter)
      }}>
        {name}
      </span>
    )
  }

  render() {
    return (
      <nav className="show-tab">
        Show:
        {' '}
        <NavLink
         to="/all"
         activeClassName="active">
          {this.renderFilter('SHOW_ALL', '全部')}
        </NavLink>
        {', '}
         <NavLink
         to="/completed"
         activeClassName="active">
        {this.renderFilter('SHOW_COMPLETED', '已完成')}</NavLink>
        {', '}
         <NavLink
         to="/active"
         activeClassName="active" >       
        {this.renderFilter('SHOW_ACTIVE', '正进行')}</NavLink>
        .
      </nav>
    )
  }
}

SwitchList.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}
