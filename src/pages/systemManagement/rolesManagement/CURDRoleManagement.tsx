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
import { memo, useEffect } from "react";
import { TYPE_MANAGEMENT } from "../../../interface/constants/type/Type.const";
import { useGlobalLoading } from "../../../components/global-loading/GlobalLoading";
import { useModalProvider } from "../../../components/notification-base/ModalNotificationTemplate";
import { RolesRequest } from "../../../interface/request/systemManagement/roles/RolesRequest.interface";
import { RolesAPI } from "../../../api/systemManagement/roles.api";
import FontAwesomeBase from "../../../components/font-awesome/FontAwesomeBase";

function CRUDRolesManagement() {
  const navigate = useNavigate();
  const { mode, id } = useParams();
  const { openNotification } = useNotification();
  const { setLoading } = useGlobalLoading();
  const { openModal } = useModalProvider();

  const { control, getValues, watch, reset, setValue } = useForm<RolesRequest>({
    defaultValues: {
      id: "",
      isActive: 1,
      roleName: "",
      roleCode: "",
    },
  });

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
    
    if (mode !== TYPE_MANAGEMENT.MODE_CREATE && id) {
      RolesAPI.detailRoles(id)
        .then((res) => {
          if (res.data.data) {
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
