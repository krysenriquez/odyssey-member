import {useState, useMemo, useEffect} from 'react'
import {useGenealogyRequest} from '../stores/GenealogyRequestProvider'
import {
  useGenealogyQueryData,
  useGenealogyQueryLoading,
  useGenealogyQueryContext,
} from '../stores/GenealogyQueryProvider'
import {CustomCardOverlay} from '@/components/elements/Card'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'
import {GenealogyChart} from '@/components/elements/GenealogyChart'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import {DebouncedInput} from '@/components/elements/Input/DebouncedInput'
import {GenealogyCreate} from './GenealogyCreate'

export const GenealogyTree = () => {
  const {history, currentHistoryIndex, setCurrentHistoryIndex, updateGenealogyAccountId} =
    useGenealogyRequest()
  const response = useGenealogyQueryData()
  const isLoading = useGenealogyQueryLoading()
  const {refetch} = useGenealogyQueryContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const genealogy = useMemo(() => response, [response])
  const [tree, setTree] = useState([])
  const [selectedNode, setSelectedNode] = useState(undefined)

  const defaultAvatar = toAbsoluteUrl('/media/avatars/blank.png')
  var jsonTree = []

  const fourthGenJSON = (object) => {
    // Start Condition for Avatar if it exists
    var avatar
    var blankAvatar = defaultAvatar
    if (object.avatar) {
      avatar = object.avatar
    } else {
      avatar = blankAvatar
    }
    // End Condition for Avatar if it exists
    // Start Parent Object
    var parent = {
      tags: [object.packageName],
      id: object.accountId,
      accountNumber: object.accountNumber,
      name: object.accountFullName,
      avatar: avatar,
      packageName: object.packageName,
    }
    jsonTree.push(parent)
    // End Parent Object
    // Start Recursive for Children of Parent
    // fourthGenJSONRecursive(object.children, object)
    var addMember2
    var addMember1
    var childMember
    if (object.children && object.children.length > 0) {
      // Loop through children object
      object.children.forEach((child) => {
        // Condition if Child order is 1st slot, and No Member on 2nd slot
        if (child.parentSide == 'LEFT' && object.children.length == 1) {
          childMember = {
            tags: [child.packageName],
            id: child.accountId,
            accountNumber: child.accountNumber,
            name: child.accountFullName,
            packageName: child.packageName,
            avatar: avatar,
            pid: object.accountId,
            parentAccountNumber: object.accountNumber,
            parentName: object.accountFullName,
            parentSide: child.parentSide,
            count: object.allLeftChildrenCount ? object.allLeftChildrenCount : '',
          }
          addMember2 = {
            tags: ['addMember'],
            id: 'add_right_' + object.accountId,
            name: 'Add Member',
            avatar: blankAvatar,
            pid: object.accountId,
            parentAccountNumber: object.accountNumber,
            parentName: object.accountFullName,
            parentSide: 'RIGHT',
            activationCode: '',
            referrer: '',
            firstName: '',
            lastName: '',
            count: object.allRightChildrenCount ? object.allRightChildrenCount : '',
          }
          jsonTree.push(childMember, addMember2)
        }
        // End Condition if Child order is 1st slot, and No Member on 2nd slot
        // Condition if Child order is 2nd slot, and No Member on 1st slot
        else if (child.parentSide == 'RIGHT' && object.children.length == 1) {
          addMember1 = {
            tags: ['addMember'],
            id: 'add_left_' + object.accountId,
            name: 'Add Member',
            avatar: blankAvatar,
            pid: object.accountId,
            parentAccountNumber: object.accountNumber,
            parentName: object.accountFullName,
            parentSide: 'LEFT',
            activationCode: '',
            referrer: '',
            firstName: '',
            lastName: '',
            count: object.allLeftChildrenCount ? object.allLeftChildrenCount : '',
          }
          childMember = {
            tags: [child.packageName],
            id: child.accountId,
            accountNumber: child.accountNumber,
            name: child.accountFullName,
            packageName: child.packageName,
            avatar: avatar,
            pid: object.accountId,
            parentAccountNumber: object.accountNumber,
            parentName: object.accountFullName,
            parentSide: child.parentSide,
            count: object.allRightChildrenCount ? object.allRightChildrenCount : '',
          }
          jsonTree.push(addMember1, childMember)
        }
        // End Condition if Child order is 2nd slot, and No Member on 1st slot
        // Condition if there are 2 children
        else {
          childMember = {
            tags: [child.packageName],
            id: child.accountId,
            accountNumber: child.accountNumber,
            name: child.accountFullName,
            packageName: child.packageName,
            avatar: avatar,
            pid: object.accountId,
            parentAccountNumber: object.accountNumber,
            parentName: object.accountFullName,
            parentSide: child.parentSide,
            count:
              child.parentSide == 'LEFT'
                ? object.allLeftChildrenCount
                : object.allRightChildrenCount,
          }
          jsonTree.push(childMember)
        }
        // End Condition if there are 2 children
        fourthGenJSONRecursiveWithSide(child.children, child, child.parentSide)
      })
    } else if (object.children && object.children.length == 0) {
      addMember1 = {
        tags: ['addMember'],
        id: 'add_left_' + object.accountId,
        name: 'Add Member',
        avatar: blankAvatar,
        pid: object.accountId,
        parentAccountNumber: object.accountNumber,
        parentName: object.accountFullName,
        parentSide: 'LEFT',
        activationCode: '',
        referrer: '',
        firstName: '',
        lastName: '',
        count: object.allLeftChildrenCount ? object.allLeftChildrenCount : '',
      }
      addMember2 = {
        tags: ['addMember'],
        id: 'add_right_' + object.accountId,
        name: 'Add Member',
        avatar: blankAvatar,
        pid: object.accountId,
        parentAccountNumber: object.accountNumber,
        parentName: object.accountFullName,
        parentSide: 'RIGHT',
        activationCode: '',
        referrer: '',
        firstName: '',
        lastName: '',
        count: object.allRightChildrenCount ? object.allRightChildrenCount : '',
      }
      jsonTree.push(addMember1, addMember2)
    }

    return jsonTree
  }

  const fourthGenJSONRecursiveWithSide = (children, parentObject, parentSide) => {
    // parentSide - Left
    // Check if Children object exists or has length
    var blankAvatar = defaultAvatar
    var addMember2
    var addMember1
    var childMember
    if (children && children.length > 0) {
      // Loop through children object
      children.forEach((child) => {
        // Start Condition for Avatar if it exists
        var avatar
        if (child.avatar) {
          avatar = child.avatar
        } else {
          avatar = blankAvatar
        }
        // End Condition for Avatar if it exists
        // Condition if Child order is 1st slot, and No Member on 2nd slot, and parentSide is LEFT
        if (child.parentSide == 'LEFT' && children.length == 1 && parentSide == 'LEFT') {
          childMember = {
            tags: [child.packageName],
            id: child.accountId,
            accountNumber: child.accountNumber,
            name: child.accountFullName,
            packageName: child.packageName,
            avatar: avatar,
            pid: parentObject.accountId,
            parentAccountNumber: parentObject.accountNumber,
            parentName: parentObject.accountFullName,
            parentSide: child.parentSide,
            count: parentObject.allLeftChildrenCount ? parentObject.allLeftChildrenCount : '',
          }
          addMember2 = {
            tags: ['blankMember'],
            id: 'blank_right_' + parentObject.accountId,
            name: 'Blank Member',
            avatar: blankAvatar,
            pid: parentObject.accountId,
            parentAccountNumber: parentObject.accountNumber,
            parentName: parentObject.accountFullName,
            parentSide: 'RIGHT',
            activationCode: '',
            referrer: '',
            firstName: '',
            lastName: '',
            count: parentObject.allRightChildrenCount ? parentObject.allRightChildrenCount : '',
          }
          jsonTree.push(childMember, addMember2)
        }
        // End Condition if Child order is 1st slot, and No Member on 2nd slot, and parentSide is LEFT
        // Condition if Child order is 2nd slot, and No Member on 1st slot, and parentSide is LEFT
        else if (child.parentSide == 'RIGHT' && children.length == 1 && parentSide == 'LEFT') {
          addMember1 = {
            tags: ['addMember'],
            id: 'add_left_' + parentObject.accountId,
            name: 'Add Member',
            avatar: blankAvatar,
            pid: parentObject.accountId,
            parentAccountNumber: parentObject.accountNumber,
            parentName: parentObject.accountFullName,
            parentSide: 'LEFT',
            activationCode: '',
            referrer: '',
            firstName: '',
            lastName: '',
            count: parentObject.allLeftChildrenCount ? parentObject.allLeftChildrenCount : '',
          }
          childMember = {
            tags: [child.packageName],
            id: child.accountId,
            accountNumber: child.accountNumber,
            name: child.accountFullName,
            packageName: child.packageName,
            avatar: avatar,
            pid: parentObject.accountId,
            parentAccountNumber: parentObject.accountNumber,
            parentName: parentObject.accountFullName,
            parentSide: child.parentSide,
            count: parentObject.allRightChildrenCount ? parentObject.allRightChildrenCount : '',
          }
          jsonTree.push(addMember1, childMember)
        }
        // Condition if Child order is 1st slot, and No Member on 2nd slot, and parentSide is RIGHT
        else if (child.parentSide == 'LEFT' && children.length == 1 && parentSide == 'RIGHT') {
          childMember = {
            tags: [child.packageName],
            id: child.accountId,
            accountNumber: child.accountNumber,
            name: child.accountFullName,
            packageName: child.packageName,
            avatar: avatar,
            pid: parentObject.accountId,
            parentAccountNumber: parentObject.accountNumber,
            parentName: parentObject.accountFullName,
            parentSide: child.parentSide,
            count: parentObject.allLeftChildrenCount ? parentObject.allLeftChildrenCount : '',
          }
          addMember2 = {
            tags: ['addMember'],
            id: 'add_right_' + parentObject.accountId,
            name: 'Add Member',
            avatar: blankAvatar,
            pid: parentObject.accountId,
            parentAccountNumber: parentObject.accountNumber,
            parentName: parentObject.accountFullName,
            parentSide: 'RIGHT',
            activationCode: '',
            referrer: '',
            firstName: '',
            lastName: '',
            count: parentObject.allRightChildrenCount ? parentObject.allRightChildrenCount : '',
          }
          jsonTree.push(childMember, addMember2)
        }
        // End Condition if Child order is 1st slot, and No Member on 2nd slot, and parentSide is RIGHT
        // Condition if Child order is 2nd slot, and No Member on 1st slot, and parentSide is RIGHT
        else if (child.parentSide == 'RIGHT' && children.length == 1 && parentSide == 'RIGHT') {
          addMember1 = {
            tags: ['blankMember'],
            id: 'blank_left_' + parentObject.accountId,
            name: 'Blank Member',
            avatar: blankAvatar,
            pid: parentObject.accountId,
            parentAccountNumber: parentObject.accountNumber,
            parentName: parentObject.accountFullName,
            parentSide: 'LEFT',
            activationCode: '',
            referrer: '',
            firstName: '',
            lastName: '',
            count: parentObject.allLeftChildrenCount ? parentObject.allLeftChildrenCount : '',
          }
          childMember = {
            tags: [child.packageName],
            id: child.accountId,
            accountNumber: child.accountNumber,
            name: child.accountFullName,
            packageName: child.packageName,
            avatar: avatar,
            pid: parentObject.accountId,
            parentAccountNumber: parentObject.accountNumber,
            parentName: parentObject.accountFullName,
            parentSide: child.parentSide,
            count: parentObject.allRightChildrenCount ? parentObject.allRightChildrenCount : '',
          }
          jsonTree.push(addMember1, childMember)
        }
        // End Condition if Child order is 2nd slot, and No Member on 1st slot, and parentSide is RIGHT
        // Condition if there are 2 children
        else {
          childMember = {
            tags: [child.packageName],
            id: child.accountId,
            accountNumber: child.accountNumber,
            name: child.accountFullName,
            packageName: child.packageName,
            avatar: avatar,
            pid: parentObject.accountId,
            parentAccountNumber: parentObject.accountNumber,
            parentName: parentObject.accountFullName,
            parentSide: child.parentSide,
            count:
              child.parentSide == 'LEFT'
                ? parentObject.allLeftChildrenCount
                : parentObject.allRightChildrenCount,
          }
          jsonTree.push(childMember)
        }
        // End Condition if there are 2 children
        fourthGenJSONRecursiveWithSide(child.children, child, child.parentSide)
      })
    } else if (children && children.length == 0) {
      if (parentSide == 'LEFT') {
        addMember1 = {
          tags: ['addMember'],
          id: 'add_left_' + parentObject.accountId,
          name: 'Add Member',
          avatar: blankAvatar,
          pid: parentObject.accountId,
          parentAccountNumber: parentObject.accountNumber,
          parentName: parentObject.accountFullName,
          parentSide: 'LEFT',
          activationCode: '',
          referrer: '',
          firstName: '',
          lastName: '',
          count: parentObject.allLeftChildrenCount ? parentObject.allLeftChildrenCount : '',
        }
        addMember2 = {
          tags: ['blankMember'],
          id: 'blank_right_' + parentObject.accountId,
          name: 'Blank Member',
          avatar: blankAvatar,
          pid: parentObject.accountId,
          parentAccountNumber: parentObject.accountNumber,
          parentName: parentObject.accountFullName,
          parentSide: 'RIGHT',
          activationCode: '',
          referrer: '',
          firstName: '',
          lastName: '',
          count: parentObject.allRightChildrenCount ? parentObject.allRightChildrenCount : '',
        }
      }
      if (parentSide == 'RIGHT') {
        addMember1 = {
          tags: ['blankMember'],
          id: 'blank_left_' + parentObject.accountId,
          name: 'Blank Member',
          avatar: blankAvatar,
          pid: parentObject.accountId,
          parentAccountNumber: parentObject.accountNumber,
          parentName: parentObject.accountFullName,
          parentSide: 'LEFT',
          activationCode: '',
          referrer: '',
          firstName: '',
          lastName: '',
          count: parentObject.allLeftChildrenCount ? parentObject.allLeftChildrenCount : '',
        }
        addMember2 = {
          tags: ['addMember'],
          id: 'add_right_' + parentObject.accountId,
          name: 'Add Member',
          avatar: blankAvatar,
          pid: parentObject.accountId,
          parentAccountNumber: parentObject.accountNumber,
          parentName: parentObject.accountFullName,
          parentSide: 'RIGHT',
          activationCode: '',
          referrer: '',
          firstName: '',
          lastName: '',
          count: parentObject.allRightChildrenCount ? parentObject.allRightChildrenCount : '',
        }
      }

      jsonTree.push(addMember1, addMember2)
    }
  }

  const search = (value) => {
    if (value) {
      updateGenealogyAccountId(value, false)
    }
  }

  useEffect(() => {
    updateGenealogyAccountId(history[currentHistoryIndex], true)
  }, [currentHistoryIndex])

  const goToPrev = () => {
    setCurrentHistoryIndex(currentHistoryIndex - 1)
  }

  const goToNext = () => {
    setCurrentHistoryIndex(currentHistoryIndex + 1)
  }

  const clickNode = (node) => {
    if (node.tags.includes('addMember')) {
      setSelectedNode(node)
      setIsModalOpen(true)
    } else {
      updateGenealogyAccountId(node.id, false)
    }
  }

  const toggleModal = () => {
    refetch()
    setIsModalOpen(!isModalOpen)
  }

  useEffect(() => {
    if (genealogy.length > 0) setTree(fourthGenJSON(genealogy[0]))
  }, [genealogy])

  return (
    <>
      <CustomCardOverlay isLoading={isLoading}>
        <div className='d-flex flex-wrap align-items-center gap-4 mb-4'>
          <span className='d-flex flex-center'>
            <span className='bullet bullet-dot bg-platinum h-20px w-20px me-2'></span>Platinum
          </span>
          <span className='d-flex flex-center'>
            <span className='bullet bullet-dot bg-gold h-20px w-20px me-2'></span>Gold
          </span>
          <span className='d-flex flex-center'>
            <span className='bullet bullet-dot bg-silver h-20px w-20px me-2'></span>Silver
          </span>
          <span className='d-flex flex-center'>
            <span className='bullet bullet-dot bg-starter h-20px w-20px me-2'></span>Starter
          </span>
        </div>
        <div className='d-flex flex-wrap justify-content-between'>
          <div className='d-flex align-items-center position-relative'>
            <CustomSVG
              path='/media/icons/search.svg'
              className='svg-icon-1 position-absolute ms-6'
            />
            <DebouncedInput
              value={''}
              onChange={(value) => search(String(value))}
              className='form-control form-control-solid w-250px ps-14'
              placeholder='Search all columns...'
            />
          </div>
          <div className='btn-group'>
            <button
              type='button'
              className='btn btn-active-light-primary'
              onClick={() => goToPrev()}
              disabled={currentHistoryIndex <= 0 ? true : false}
            >
              <CustomSVG
                path='/media/icons/arrows/left-arrow.svg'
                className='svg-icon svg-icon-1'
              />
            </button>
            <button
              type='button'
              className='btn btn-active-light-primary'
              onClick={() => goToNext()}
              disabled={currentHistoryIndex >= history.length - 1 ? true : false}
            >
              <CustomSVG
                path='/media/icons/arrows/right-arrow.svg'
                className='svg-icon svg-icon-1'
              />
            </button>
          </div>
        </div>
        {tree.length > 0 ? <GenealogyChart nodes={tree} handleClick={clickNode} /> : <></>}
      </CustomCardOverlay>
      {isModalOpen && (
        <GenealogyCreate isModalOpen={isModalOpen} toggleModal={toggleModal} node={selectedNode} />
      )}
    </>
  )
}
