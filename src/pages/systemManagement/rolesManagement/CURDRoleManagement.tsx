import FormChildTemplate from "../../../components/form-base/form-basic-base/FormChildTemplate";
import FormFooterTemplate from "../../../components/form-base/form-basic-base/FormFooterTemplate";
import FormTemplate from "../../../components/form-base/form-basic-base/FormTemplate";
import InputTextTemplate from "../../../components/input-base/InputTextTemplate";
import CardLayoutTemplate from "../../../components/layout-base/CardLayoutTemplate";
import { useForm } from "react-hook-form";
import ButtonBase from "../../../components/button-base/ButtonBase";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTER_BASE } from "../../../router/router.constant";
import { t } from "i18next";
import { useNotification } from "../../../components/notification-base/NotificationTemplate";
import { memo, useEffect, useState } from "react";
import { TYPE_MANAGEMENT } from "../../../interface/constants/type/Type.const";
import { useGlobalLoading } from "../../../components/global-loading/GlobalLoading";
import { useModalProvider } from "../../../components/notification-base/ModalNotificationTemplate";
import { RolesRequest } from "../../../interface/request/systemManagement/roles/RolesRequest.interface";
import TreeTemplate from "../../../components/tree-base/TreeTemplate";
import { TreeDataNode } from "antd";
import { RolesAPI } from "../../../api/systemManagement/roles.api";
import FontAwesomeBase from "../../../components/font-awesome/FontAwesomeBase";

function CRUDRolesManagement() {
  const navigate = useNavigate();
  const { mode, id } = useParams();
  const { openNotification } = useNotification();
  const { setLoading } = useGlobalLoading();
  const { openModal } = useModalProvider();
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [dataObjectForm, setDataObjectForm] = useState<string[]>([]);

  const { control, getValues, watch, reset, setValue } = useForm<RolesRequest>({
    defaultValues: {
      id: "",
      isActive: 1,
      roleName: "",
      roleCode: "",
      object: [],
    },
  });

  const object = watch("object");

  useEffect(() => {
    if (object) {
      var treeDataGetForm = new Set<string>();
      object.forEach((el) => {
        treeDataGetForm.add(el);
        const parentTree = searchParentTreeData(el, treeData);
        if (parentTree != undefined) {
          treeDataGetForm.add(parentTree.key as string);
        }
      });
      setDataObjectForm(Array.from(treeDataGetForm));
    }
  }, [object]);

  const searchParentTreeData = (
    id: string,
    treeData: TreeDataNode[]
  ): TreeDataNode | undefined => {
    for (const tree of treeData) {
      if (tree.children) {
        const childNode = tree.children.find((child) => child.key === id);
        if (childNode) {
          return tree;
        } else {
          const found = searchParentTreeData(id, tree.children);
          if (found) {
            return found;
          }
        }
      }
    }
    return undefined;
  };

  const back = () => {
    navigate(ROUTER_BASE.roleManagement.path);
  };

  const onCreate = () => {
    openModal(
      "confirm",
      t("common.confirm.title"),
      t("rolesManagement.confirmCreate"),
      () => {
        setLoading(true);
        setValue("object", dataObjectForm);
        RolesAPI.createRoles(getValues())
          .then((response) => {
            if (
              response.status &&
              response.status === TYPE_MANAGEMENT.STATUS_SUCCESS
            ) {
              openNotification(
                "success",
                t("common.notification.success"),
                t("rolesManagement.createSuccess")
              );
              back();
            }
          })
          .catch((error) => {
            if (
              error.response &&
              error.response.status === TYPE_MANAGEMENT.STATUS_ERROR_400
            ) {
              if (
                error.response.data &&
                error.response.data.status === TYPE_MANAGEMENT.STATUS_ERROR_400
              ) {
                openNotification(
                  "error",
                  t("common.notification.error"),
                  error.response.data
                );
              }
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
    );
  };

  const onUpdate = () => {
    openModal(
      "confirm",
      t("common.confirm.title"),
      t("rolesManagement.confirmUpdate"),
      () => {
        setLoading(true);
        setValue("object", dataObjectForm);
        
        RolesAPI.updateRoles(getValues())
          .then((response) => {
            if (
              response.status &&
              response.status === TYPE_MANAGEMENT.STATUS_SUCCESS
            ) {
              openNotification(
                "success",
                t("common.notification.success"),
                t("rolesManagement.updateSuccess")
              );
              back();
            }
          })
          .catch((error) => {
            if (
              error.response &&
              error.response.status === TYPE_MANAGEMENT.STATUS_ERROR_400
            ) {
              if (
                error.response.data &&
                error.response.data.status === TYPE_MANAGEMENT.STATUS_ERROR_400
              ) {
                openNotification(
                  "error",
                  t("common.notification.error"),
                  error.response.data
                );
              }
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
    );
  };

  const onDelete = () => {
    openModal(
      "confirm",
      t("common.confirm.title"),
      t("rolesManagement.confirmDelete"),
      () => {
        setLoading(true);
        RolesAPI.deleteRoles(getValues("id"))
          .then((response) => {
            if (
              response.status &&
              response.status === TYPE_MANAGEMENT.STATUS_SUCCESS
            ) {
              openNotification(
                "success",
                t("common.notification.success"),
                t("rolesManagement.deleteSuccess")
              );
              back();
            }
          })
          .catch((error) => {
            if (
              error.response &&
              error.response.status === TYPE_MANAGEMENT.STATUS_ERROR_400
            ) {
              if (
                error.response.data &&
                error.response.data.status === TYPE_MANAGEMENT.STATUS_ERROR_400
              ) {
                openNotification(
                  "error",
                  t("common.notification.error"),
                  error.response.data
                );
              }
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
    );
  };

  useEffect(() => {
    setLoading(true);
    RolesAPI.getAllObjects().then((res) => {
      console.log(res.data.data);
      
      setTreeData(convertData(res.data.data));
    });
    if (mode !== TYPE_MANAGEMENT.MODE_CREATE && id && id !== "0") {
      RolesAPI.detailRoles(id)
        .then((res) => {
          if (res.data.data && res.data.data.rolesObjectDetailRequests) {
            res.data.data.object = filteredNodes(res.data.data.rolesObjectDetailRequests).map((el: { idObject: number }) => el.idObject.toString());
            reset(res.data.data);
        }
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.status === TYPE_MANAGEMENT.STATUS_ERROR_400
          ) {
            if (
              error.response.data &&
              error.response.data.status === TYPE_MANAGEMENT.STATUS_ERROR_404
            ) {
              openModal(
                "error",
                t("common.notification.error"),
                t("rolesManagement.error.notFound"),
                () => {
                  back();
                }
              );
            }
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setLoading(false);
  }, []);

  const filteredNodes = (data: Array<{idParent: number, idObject: number }>) => {
    return data.filter(obj => {
      const hasParent = data.some(el => el.idParent === obj.idObject);
      return !hasParent;
  });
  };

  const convertData = (data: Array<any>) => {
    return data.map((item) => {
      const newItem: TreeDataNode = {
        title: `${item.code} - ${item.name} - ${t(item.type)}`,
        key: `${item.id}`,
      };
      if (item.childId.length > 0) {
        newItem.children = convertData(item.childId);
      }
      return newItem;
    });
  };

  return (
    <>
      <CardLayoutTemplate
        className="mb-10 mt-8 shadow-md"
        title={
          mode === TYPE_MANAGEMENT.MODE_CREATE
            ? t("rolesManagement.titleCreate")
            : mode === TYPE_MANAGEMENT.MODE_UPDATE
            ? t("rolesManagement.titleUpdate")
            : t("rolesManagement.titleDetail")
        }
      >
        {/* form crud */}
        <FormTemplate contentSize={"70"} labelSize={"30"}>
          {/* content form crud */}
          <FormChildTemplate
            title={t("rolesManagement.fieldName.code")}
            required={true}
          >
            <InputTextTemplate mode={mode} name="roleCode" control={control} />
          </FormChildTemplate>

          <FormChildTemplate
            title={t("rolesManagement.fieldName.name")}
            required={true}
          >
            <InputTextTemplate mode={mode} name="roleName" control={control} />
          </FormChildTemplate>

          <FormChildTemplate
            title={t("rolesManagement.fieldName.objects")}
            required={true}
          >
            <TreeTemplate data={treeData} disabled={mode === TYPE_MANAGEMENT.MODE_DETAIL} name="object" control={control} />
          </FormChildTemplate>

          <FormFooterTemplate>
            {mode === TYPE_MANAGEMENT.MODE_CREATE ? (
              <ButtonBase
                className="mx-2 btn btn__create"
                onClick={() => onCreate()}
              >
                <FontAwesomeBase className="mr-2" iconName={"plus"} />{t("common.button.create")}
              </ButtonBase>
            ) : mode === TYPE_MANAGEMENT.MODE_DETAIL ? (
              <ButtonBase
                onClick={() =>
                  navigate(
                    `${ROUTER_BASE.roleManagement.path}/${TYPE_MANAGEMENT.MODE_UPDATE}/${id}`
                  )
                }
                className="mx-2 btn btn__goToUpdate"
              >
                <FontAwesomeBase className="mr-2" iconName={"file-pen"} />{t("common.button.goToUpdate")}
              </ButtonBase>
            ) : (
              <>
                {" "}
                <ButtonBase
                  className="mx-2 btn btn__update"
                  onClick={() => onUpdate()}
                >
                  <FontAwesomeBase className="mr-2" iconName={"pen-to-square"} />{t("common.button.update")}
                </ButtonBase>
                <ButtonBase
                  className="mx-2 btn btn__delete"
                  onClick={() => onDelete()}
                >
                  <FontAwesomeBase className="mr-2" iconName={"trash"} />{t("common.button.delete")}
                </ButtonBase>
              </>
            )}
            <ButtonBase className="mx-2 btn btn__back" onClick={() => back()}>
              <FontAwesomeBase className="mr-2" iconName={"rotate-left"} />{t("common.button.back")}
            </ButtonBase>
          </FormFooterTemplate>
        </FormTemplate>
      </CardLayoutTemplate>
    </>
  );
}

export default memo(CRUDRolesManagement);
