import { ComponentClass } from 'react'
import Taro, { Component, Config, hideToast } from '@tarojs/taro'
import { View, Button, Text, Input, Label, Checkbox, CheckboxGroup } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, del, update } from '../../store/actions/todolist'

import './index.less'

type PageStateProps = {
  toDoList:  Array<{checked: boolean, value: string}>,
}
type PageState = {
  value: string
}

// 定义page里面方法
type PageDispatchProps = {
  pageAdd: (list) => any,
  pageDel: (list) => any,
  pageUpdate: (list) => any
}

type IProps = PageStateProps & PageDispatchProps

interface Index {
  props: IProps;
}

@connect(({toDoList}) => ({
  toDoList
})
, (dispatch) => ({
  pageAdd (list) {
    dispatch(add(list))
  },
  pageDel (list) {
    dispatch(del(list))
  },
  pageUpdate (list) {
    dispatch(update(list))
  }
}))

class Index extends Component<IProps, PageState> {
  config: Config = {
    navigationBarTitleText: '首页'
  }

  constructor(props) {
    super(props)
    this.state
  }
    
  componentWillReceiveProps () {
    // console.log('willReceiveProps')
  }

  componentDidMount () {
    // console.log('DidMount')
  }

  // 只监控、只暂存第一级的变化，例如对象数组内一对象属性变化，preState 会与nextState一样，看不出前后变化
  shouldComponentUpdate(newProps, nextState) {
    // console.log('shouldUpdate', nextState)
    return true;
  }

  componentWillUpdate (nextProps, nextState) {
  }

  handleChange(event) {
    console.log(event.target.value)
    this.setState({value: event.target.value});
  }

  check (i) {
    if (!this.props.toDoList.length) return
    this.props.toDoList[i].checked = !this.props.toDoList[i].checked
    this.props.pageUpdate([...this.props.toDoList])
  }

  add () {
    if (!this.state.value) return
  
    let item = {
        value: this.state.value,
        text: this.state.value,
        checked: false
    }
    let newList = [...this.props.toDoList, item]
    this.props.pageAdd(newList)
  }

  del () {
    const filteredList = this.props.toDoList.filter((item) => { return !item.checked })
    this.props.pageDel(filteredList)
  }

  render () {
    const { toDoList } = this.props
    const { value } = this.state
    return (
      <View className='index_wraper'>
        <View className="content_title">Todo List</View>
        <View className="content_item_0">
          <Button onClick={this.del.bind(this)} className='button_del' hoverStartTime={20}  hover-class="other-button-del-hover">Clear</Button>
          <Input onInput={(e): void=> { this.handleChange(e) } }  className="input_text_name" value={value} maxLength={10} placeholder='请输入选项'></Input> 
          <Button onClick={this.add.bind(this)} className="button_add" hoverStartTime={20} hover-class="other-button-add-hover">Add</Button>
        </View>
        <View className="content_item_1">
          {toDoList.map((item, index) => {
            return (
            <View className='checkbox-list__view' key={index}>
              <Checkbox className='checkbox-list__checkbox' value={item.value} onClick={(e)=> { this.check(index)}} checked={item.checked}><Label className="item_text">{item.text}</Label></Checkbox>
            </View>
            )
          })}
        </View>
      </View>
    )
  }
}

export default Index
